-- Insert sample products for MitthuuG
-- Run this in Supabase SQL Editor after running the e-commerce schema migration

-- Clear existing products (optional)
-- DELETE FROM products;

-- Insert featured jaggery products
INSERT INTO products (name, slug, description, price, compare_at_price, category, image_url, stock, is_featured, is_active, is_new, is_bestseller, weight, ingredients)
VALUES
-- Featured Products
('Organic Jaggery Powder', 'organic-jaggery-powder', 'Premium quality organic jaggery powder made from pure sugarcane juice. Rich in minerals and perfect for daily use in tea, coffee, and cooking.', 250, 299, 'Powder', 'https://images.unsplash.com/photo-1599909533313-d6ce0fc82e1f?w=800', 100, true, true, false, true, '500g', 'Pure Organic Sugarcane Juice'),

('Gud Ladoo Premium Box', 'gud-ladoo-premium-box', 'Handcrafted traditional gud ladoos made with pure jaggery, roasted peanuts, and sesame seeds. A perfect blend of taste and nutrition.', 350, 400, 'Ladoo', 'https://images.unsplash.com/photo-1606312645999-8ede8f82a57d?w=800', 75, true, true, true, true, '250g (6 pieces)', 'Jaggery, Peanuts, Sesame Seeds, Ghee'),

('Palm Jaggery Cubes', 'palm-jaggery-cubes', 'Naturally processed palm jaggery cubes from Kerala. Perfect for making traditional sweets and adding to beverages.', 320, 380, 'Blocks', 'https://images.unsplash.com/photo-1587049352846-4a222e784169?w=800', 60, true, true, false, false, '400g', '100% Pure Palm Jaggery'),

('Jaggery Balls Gift Pack', 'jaggery-balls-gift-pack', 'Premium jaggery balls infused with cardamom and dry fruits. Perfect for gifting during festivals and special occasions.', 450, 550, 'Balls', 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=800', 50, true, true, true, false, '300g', 'Jaggery, Cardamom, Almonds, Cashews'),

-- Powder Category
('Jaggery Powder with Turmeric', 'jaggery-powder-turmeric', 'Health-boosting combination of organic jaggery powder and turmeric. Great for immunity and daily wellness.', 280, 320, 'Powder', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800', 80, false, true, true, false, '500g', 'Jaggery Powder, Turmeric Powder'),

('Date Palm Jaggery Powder', 'date-palm-jaggery-powder', 'Rare date palm jaggery powder with natural sweetness and rich iron content. Perfect for pregnant women and children.', 400, 450, 'Powder', 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=800', 40, false, true, false, false, '500g', '100% Date Palm Extract'),

-- Ladoo Category
('Til Gud Ladoo', 'til-gud-ladoo', 'Traditional sesame jaggery ladoos made during Makar Sankranti. Packed with energy and nutrition.', 300, 350, 'Ladoo', 'https://images.unsplash.com/photo-1599909533313-d6ce0fc82e1f?w=800', 90, false, true, false, true, '200g (5 pieces)', 'Sesame Seeds, Jaggery, Ghee'),

('Dry Fruit Gud Ladoo', 'dry-fruit-gud-ladoo', 'Premium ladoos enriched with cashews, almonds, pistachios, and pure jaggery. A royal treat for your taste buds.', 500, 600, 'Ladoo', 'https://images.unsplash.com/photo-1581798459219-c944e0892630?w=800', 35, false, true, true, false, '250g (6 pieces)', 'Jaggery, Cashews, Almonds, Pistachios, Ghee'),

-- Blocks Category
('Sugarcane Jaggery Blocks', 'sugarcane-jaggery-blocks', 'Traditional solid jaggery blocks made from fresh sugarcane juice. Long shelf life and authentic taste.', 200, 250, 'Blocks', 'https://images.unsplash.com/photo-1584990347449-39b0127e8fd9?w=800', 120, false, true, false, true, '1kg', 'Pure Sugarcane Juice'),

('Mini Jaggery Cubes', 'mini-jaggery-cubes', 'Convenient mini cubes perfect for individual servings in tea and coffee. Hygienically packed.', 150, 180, 'Blocks', 'https://images.unsplash.com/photo-1587049352846-4a222e784169?w=800', 100, false, true, false, false, '250g (25 cubes)', 'Sugarcane Jaggery'),

-- Balls Category
('Cardamom Jaggery Balls', 'cardamom-jaggery-balls', 'Bite-sized jaggery balls flavored with premium green cardamom. Perfect post-meal digestive.', 280, 320, 'Balls', 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=800', 70, false, true, false, false, '200g', 'Jaggery, Cardamom'),

('Ginger Jaggery Energy Balls', 'ginger-jaggery-energy-balls', 'Energizing combination of dried ginger and jaggery. Great for winters and boosting immunity.', 320, 370, 'Balls', 'https://images.unsplash.com/photo-1599909533313-d6ce0fc82e1f?w=800', 55, false, true, true, false, '250g', 'Jaggery, Dry Ginger, Black Pepper');

-- Update sold_count, rating, and review_count for featured products
UPDATE products 
SET 
  sold_count = 450,
  rating = 4.8,
  review_count = 89
WHERE slug = 'organic-jaggery-powder';

UPDATE products 
SET 
  sold_count = 320,
  rating = 4.7,
  review_count = 64
WHERE slug = 'gud-ladoo-premium-box';

UPDATE products 
SET 
  sold_count = 280,
  rating = 4.6,
  review_count = 52
WHERE slug = 'palm-jaggery-cubes';

UPDATE products 
SET 
  sold_count = 210,
  rating = 4.9,
  review_count = 41
WHERE slug = 'jaggery-balls-gift-pack';

UPDATE products 
SET 
  sold_count = 180,
  rating = 4.5,
  review_count = 38
WHERE slug = 'til-gud-ladoo';

UPDATE products 
SET 
  sold_count = 150,
  rating = 4.7,
  review_count = 29
WHERE slug = 'sugarcane-jaggery-blocks';

-- Success message
SELECT 'Sample products inserted successfully!' as message, COUNT(*) as total_products FROM products;
