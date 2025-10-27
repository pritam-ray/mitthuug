-- Quick diagnostic queries for products table

-- 1. Check if products exist
SELECT COUNT(*) as total_products FROM products;

-- 2. Check if any featured products exist
SELECT COUNT(*) as featured_products FROM products WHERE is_featured = true;

-- 3. View all products (if RLS is blocking, this will fail)
SELECT id, name, slug, is_featured, is_active FROM products LIMIT 5;

-- 4. Check RLS policies on products table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'products';

-- 5. Temporarily disable RLS on products table (for testing ONLY)
-- Uncomment the line below to allow public access to products
-- ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- 6. Enable public SELECT access to products (recommended approach)
-- Run this if you want anonymous users to view products:
DROP POLICY IF EXISTS "Allow public read access to active products" ON products;
CREATE POLICY "Allow public read access to active products"
  ON products
  FOR SELECT
  USING (is_active = true);

-- 7. Verify the policy was created
SELECT policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename = 'products' AND policyname = 'Allow public read access to active products';
