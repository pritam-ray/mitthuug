-- Update product images to use placeholder images
-- Run this in Supabase SQL Editor to see products display immediately

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&h=800&fit=crop',
  images = ARRAY[
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&h=800&fit=crop&sat=-50',
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&h=800&fit=crop&brightness=10'
  ]
WHERE slug = 'classic-gud-bites';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=800&fit=crop',
  images = ARRAY[
    'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=800&fit=crop&sat=-50'
  ]
WHERE slug = 'ginger-gud-chikki';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1606312619070-d48b4cdb0e3f?w=800&h=800&fit=crop',
  images = ARRAY[
    'https://images.unsplash.com/photo-1606312619070-d48b4cdb0e3f?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1606312619070-d48b4cdb0e3f?w=800&h=800&fit=crop&sat=-50'
  ]
WHERE slug = 'coconut-gud-ladoo';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1572915904803-35d03e6e5f2c?w=800&h=800&fit=crop',
  images = ARRAY[
    'https://images.unsplash.com/photo-1572915904803-35d03e6e5f2c?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1572915904803-35d03e6e5f2c?w=800&h=800&fit=crop&sat=-50'
  ]
WHERE slug = 'til-gud-barfi';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&h=800&fit=crop',
  images = ARRAY[
    'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&h=800&fit=crop&sat=-50'
  ]
WHERE slug = 'dry-fruit-gud-mix';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1548848979-e31e0b7a2880?w=800&h=800&fit=crop',
  images = ARRAY[
    'https://images.unsplash.com/photo-1548848979-e31e0b7a2880?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1548848979-e31e0b7a2880?w=800&h=800&fit=crop&sat=-50'
  ]
WHERE slug = 'chocolate-gud-fusion';
