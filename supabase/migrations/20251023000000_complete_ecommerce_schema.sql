-- MitthuuG E-Commerce Platform - Complete Database Schema
-- Generated: October 23, 2025
-- This migration creates all tables, indexes, and constraints needed for the platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PRODUCTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    compare_at_price DECIMAL(10, 2) CHECK (compare_at_price >= price),
    cost_price DECIMAL(10, 2) CHECK (cost_price >= 0),
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    tags TEXT[], -- Array of tags
    
    -- Images
    image_url TEXT NOT NULL,
    images TEXT[], -- Array of additional images
    
    -- Inventory
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    low_stock_threshold INTEGER DEFAULT 10,
    
    -- Product attributes
    weight DECIMAL(10, 2), -- in grams
    dimensions JSONB, -- {length, width, height}
    
    -- Nutritional info
    nutrition_info JSONB, -- {calories, protein, carbs, fat, fiber, sugar}
    ingredients TEXT[],
    allergens TEXT[],
    
    -- Ratings & reviews
    rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0 CHECK (review_count >= 0),
    
    -- Sales tracking
    sold_count INTEGER DEFAULT 0 CHECK (sold_count >= 0),
    view_count INTEGER DEFAULT 0 CHECK (view_count >= 0),
    
    -- Status flags
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_new BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for products
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_is_active ON products(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- ============================================================================
-- PRODUCT VARIANTS TABLE (for different sizes, flavors, etc.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- e.g., "250g Pack", "Ginger Flavor"
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    compare_at_price DECIMAL(10, 2),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    image_url TEXT,
    
    -- Variant options (e.g., {size: "250g", flavor: "ginger"})
    options JSONB,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);

-- ============================================================================
-- REVIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    
    -- Verification
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    
    -- Moderation
    is_approved BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- Helpfulness tracking
    helpful_count INTEGER DEFAULT 0 CHECK (helpful_count >= 0),
    
    -- Images uploaded by reviewer
    images TEXT[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- One review per user per product
    UNIQUE(product_id, user_id)
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

-- ============================================================================
-- REVIEW HELPFULNESS TRACKING
-- ============================================================================
CREATE TABLE IF NOT EXISTS review_helpful (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- One vote per user per review
    UNIQUE(review_id, user_id)
);

CREATE INDEX idx_review_helpful_review_id ON review_helpful(review_id);

-- ============================================================================
-- ORDERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Customer info (stored for guest checkouts)
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    
    -- Pricing
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    discount_amount DECIMAL(10, 2) DEFAULT 0 CHECK (discount_amount >= 0),
    shipping_cost DECIMAL(10, 2) DEFAULT 0 CHECK (shipping_cost >= 0),
    tax_amount DECIMAL(10, 2) DEFAULT 0 CHECK (tax_amount >= 0),
    total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
    
    -- Shipping address
    shipping_address JSONB NOT NULL, -- {name, phone, address_line1, address_line2, city, state, pincode, country}
    billing_address JSONB, -- Same structure, NULL if same as shipping
    
    -- Order status
    status VARCHAR(50) DEFAULT 'pending' CHECK (
        status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')
    ),
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (
        payment_status IN ('pending', 'paid', 'failed', 'refunded')
    ),
    
    -- Payment details
    payment_method VARCHAR(50), -- 'stripe', 'razorpay', 'cod'
    payment_id VARCHAR(255), -- Payment gateway transaction ID
    
    -- Coupon
    coupon_code VARCHAR(50),
    
    -- Tracking
    tracking_number VARCHAR(100),
    tracking_url TEXT,
    
    -- Notes
    customer_notes TEXT,
    admin_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP WITH TIME ZONE,
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- ============================================================================
-- ORDER ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    
    -- Product snapshot (in case product is deleted/changed)
    product_name VARCHAR(255) NOT NULL,
    product_image TEXT,
    sku VARCHAR(100),
    
    -- Pricing at time of purchase
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    discount_amount DECIMAL(10, 2) DEFAULT 0 CHECK (discount_amount >= 0),
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ============================================================================
-- USER PROFILES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    avatar_url TEXT,
    
    -- Preferences
    preferences JSONB, -- {newsletter: true, sms_notifications: false, etc}
    
    -- Loyalty
    loyalty_points INTEGER DEFAULT 0 CHECK (loyalty_points >= 0),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- ADDRESSES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    
    address_type VARCHAR(50) DEFAULT 'home' CHECK (address_type IN ('home', 'work', 'other')),
    is_default BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_addresses_is_default ON addresses(is_default) WHERE is_default = TRUE;

-- ============================================================================
-- WISHLIST TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- One product per user in wishlist
    UNIQUE(user_id, product_id)
);

CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX idx_wishlist_product_id ON wishlist(product_id);

-- ============================================================================
-- COUPONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    
    -- Discount
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10, 2) NOT NULL CHECK (discount_value > 0),
    
    -- Constraints
    min_order_value DECIMAL(10, 2),
    max_discount_amount DECIMAL(10, 2),
    usage_limit INTEGER, -- NULL = unlimited
    usage_count INTEGER DEFAULT 0 CHECK (usage_count >= 0),
    per_user_limit INTEGER DEFAULT 1,
    
    -- Validity
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP WITH TIME ZONE,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_is_active ON coupons(is_active) WHERE is_active = TRUE;

-- ============================================================================
-- COUPON USAGE TRACKING
-- ============================================================================
CREATE TABLE IF NOT EXISTS coupon_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    discount_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_coupon_usage_coupon_id ON coupon_usage(coupon_id);
CREATE INDEX idx_coupon_usage_user_id ON coupon_usage(user_id);

-- ============================================================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    source VARCHAR(100), -- 'homepage', 'checkout', 'blog', etc.
    is_subscribed BOOLEAN DEFAULT TRUE,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_is_subscribed ON newsletter_subscribers(is_subscribed) WHERE is_subscribed = TRUE;

-- ============================================================================
-- BLOG POSTS TABLE (for future blog functionality)
-- ============================================================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    category VARCHAR(100),
    tags TEXT[],
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Publishing
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Engagement
    view_count INTEGER DEFAULT 0 CHECK (view_count >= 0),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- ============================================================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMPS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_variants_updated_at BEFORE UPDATE ON product_variants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS FOR BUSINESS LOGIC
-- ============================================================================

-- Function to mark review as helpful
CREATE OR REPLACE FUNCTION mark_review_helpful(review_uuid UUID, user_uuid UUID)
RETURNS VOID AS $$
BEGIN
    -- Insert or ignore if already marked
    INSERT INTO review_helpful (review_id, user_id)
    VALUES (review_uuid, user_uuid)
    ON CONFLICT (review_id, user_id) DO NOTHING;
    
    -- Update helpful count
    UPDATE reviews
    SET helpful_count = (
        SELECT COUNT(*) FROM review_helpful WHERE review_id = review_uuid
    )
    WHERE id = review_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to update product rating after review
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET 
        rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM reviews
            WHERE product_id = NEW.product_id AND is_approved = TRUE
        ),
        review_count = (
            SELECT COUNT(*)
            FROM reviews
            WHERE product_id = NEW.product_id AND is_approved = TRUE
        )
    WHERE id = NEW.product_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_rating_after_review
AFTER INSERT OR UPDATE OF rating, is_approved ON reviews
FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number = 'MG' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDD') || '-' || 
                       LPAD(NEXTVAL('order_number_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq;

CREATE TRIGGER generate_order_number_trigger
BEFORE INSERT ON orders
FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- Function to update product stock after order
CREATE OR REPLACE FUNCTION update_product_stock_after_order()
RETURNS TRIGGER AS $$
BEGIN
    -- Decrease stock for each product in the order
    UPDATE products p
    SET 
        stock = stock - oi.quantity,
        sold_count = sold_count + oi.quantity
    FROM order_items oi
    WHERE oi.order_id = NEW.id AND oi.product_id = p.id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stock_after_order
AFTER INSERT ON orders
FOR EACH ROW 
WHEN (NEW.payment_status = 'paid')
EXECUTE FUNCTION update_product_stock_after_order();

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Insert default categories (for reference)
-- These will be managed via the products table, but here for documentation:
-- Classic Collection, Spiced Collection, Premium Collection, Festival Specials, Gift Boxes

COMMENT ON TABLE products IS 'Core products catalog with inventory, pricing, and SEO';
COMMENT ON TABLE reviews IS 'Customer reviews with verification and moderation';
COMMENT ON TABLE orders IS 'Customer orders with payment and shipping tracking';
COMMENT ON TABLE order_items IS 'Line items for each order';
COMMENT ON TABLE wishlist IS 'User wishlist for save-for-later functionality';
COMMENT ON TABLE coupons IS 'Discount coupons with usage limits';
COMMENT ON TABLE newsletter_subscribers IS 'Email newsletter subscriptions';

-- Migration complete
SELECT 'MitthuuG database schema created successfully!' as status;
