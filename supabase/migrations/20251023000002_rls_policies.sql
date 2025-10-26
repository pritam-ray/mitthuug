-- MitthuuG Row Level Security (RLS) Policies
-- Secure database access with user-level permissions

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_helpful ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PRODUCTS & VARIANTS - PUBLIC READ, ADMIN WRITE
-- ============================================================================

-- Anyone can view active products
CREATE POLICY "Products are publicly visible"
ON products FOR SELECT
USING (is_active = TRUE);

-- Only authenticated users with admin role can insert/update/delete
CREATE POLICY "Only admins can insert products"
ON products FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

CREATE POLICY "Only admins can update products"
ON products FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

CREATE POLICY "Only admins can delete products"
ON products FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- Product variants follow same rules
CREATE POLICY "Product variants are publicly visible"
ON product_variants FOR SELECT
USING (is_active = TRUE);

CREATE POLICY "Only admins can manage variants"
ON product_variants FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- ============================================================================
-- REVIEWS - USERS CAN CRUD THEIR OWN, EVERYONE CAN READ APPROVED
-- ============================================================================

-- Anyone can view approved reviews
CREATE POLICY "Approved reviews are publicly visible"
ON reviews FOR SELECT
USING (is_approved = TRUE);

-- Authenticated users can create reviews
CREATE POLICY "Authenticated users can create reviews"
ON reviews FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update their own reviews"
ON reviews FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews"
ON reviews FOR DELETE
USING (auth.uid() = user_id);

-- Admins can manage all reviews
CREATE POLICY "Admins can manage all reviews"
ON reviews FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- ============================================================================
-- REVIEW HELPFUL - USERS CAN MARK REVIEWS AS HELPFUL
-- ============================================================================

CREATE POLICY "Users can view helpful counts"
ON review_helpful FOR SELECT
USING (TRUE);

CREATE POLICY "Authenticated users can mark reviews helpful"
ON review_helpful FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- ORDERS & ORDER ITEMS - USERS CAN ONLY SEE THEIR OWN
-- ============================================================================

-- Users can view their own orders
CREATE POLICY "Users can view their own orders"
ON orders FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own orders
CREATE POLICY "Users can create orders"
ON orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders"
ON orders FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- Admins can update orders
CREATE POLICY "Admins can update orders"
ON orders FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- Order items inherit order permissions
CREATE POLICY "Users can view their own order items"
ON order_items FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM orders
        WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    )
);

CREATE POLICY "Users can create order items"
ON order_items FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM orders
        WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    )
);

CREATE POLICY "Admins can manage all order items"
ON order_items FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- ============================================================================
-- USER PROFILES - USERS CAN ONLY MANAGE THEIR OWN
-- ============================================================================

-- Users can view their own profile
CREATE POLICY "Users can view their own profile"
ON user_profiles FOR SELECT
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE POLICY "Users can insert their own profile"
ON user_profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- ============================================================================
-- ADDRESSES - USERS CAN ONLY MANAGE THEIR OWN
-- ============================================================================

CREATE POLICY "Users can view their own addresses"
ON addresses FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own addresses"
ON addresses FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own addresses"
ON addresses FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own addresses"
ON addresses FOR DELETE
USING (auth.uid() = user_id);

-- ============================================================================
-- WISHLIST - USERS CAN ONLY MANAGE THEIR OWN
-- ============================================================================

CREATE POLICY "Users can view their own wishlist"
ON wishlist FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their wishlist"
ON wishlist FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their wishlist"
ON wishlist FOR DELETE
USING (auth.uid() = user_id);

-- ============================================================================
-- COUPONS - PUBLIC READ, ADMIN WRITE
-- ============================================================================

-- Anyone can view active coupons
CREATE POLICY "Active coupons are publicly visible"
ON coupons FOR SELECT
USING (is_active = TRUE);

-- Only admins can manage coupons
CREATE POLICY "Only admins can manage coupons"
ON coupons FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- ============================================================================
-- COUPON USAGE - TRACK WHO USED WHAT
-- ============================================================================

CREATE POLICY "Users can view their own coupon usage"
ON coupon_usage FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can record coupon usage"
ON coupon_usage FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all coupon usage"
ON coupon_usage FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- ============================================================================
-- NEWSLETTER - PUBLIC SUBSCRIBE, USERS MANAGE THEIR OWN
-- ============================================================================

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
ON newsletter_subscribers FOR INSERT
WITH CHECK (TRUE);

-- Anyone can view their subscription (by email match)
CREATE POLICY "Users can view their own subscription"
ON newsletter_subscribers FOR SELECT
USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
    OR TRUE -- Allow public read for now, can be restricted
);

-- Users can update their own subscription
CREATE POLICY "Users can update their own subscription"
ON newsletter_subscribers FOR UPDATE
USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Admins can manage all subscriptions
CREATE POLICY "Admins can manage all subscriptions"
ON newsletter_subscribers FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- ============================================================================
-- BLOG POSTS - PUBLIC READ PUBLISHED, ADMIN WRITE
-- ============================================================================

-- Anyone can view published blog posts
CREATE POLICY "Published blog posts are publicly visible"
ON blog_posts FOR SELECT
USING (status = 'published');

-- Only admins and authors can manage blog posts
CREATE POLICY "Admins can manage all blog posts"
ON blog_posts FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
    OR auth.uid() = author_id
);

-- ============================================================================
-- HELPER FUNCTION: CHECK IF USER IS ADMIN
-- ============================================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- TRIGGER TO AUTO-CREATE USER PROFILE ON SIGNUP
-- ============================================================================

CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (id, full_name, preferences)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        '{"role": "customer", "newsletter": true}'::jsonb
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant read permissions to anonymous users (for browsing products)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON products TO anon;
GRANT SELECT ON product_variants TO anon;
GRANT SELECT ON reviews TO anon;
GRANT SELECT ON blog_posts TO anon;
GRANT INSERT ON newsletter_subscribers TO anon;

SELECT 'RLS policies created successfully!' as status;
