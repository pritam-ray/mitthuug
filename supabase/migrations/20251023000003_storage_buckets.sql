-- MitthuuG Storage Buckets Configuration
-- Create storage buckets for images with public access

-- ============================================================================
-- CREATE STORAGE BUCKETS
-- ============================================================================

-- Product images bucket (publicly accessible)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- User avatars bucket (publicly accessible)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Blog images bucket (publicly accessible)
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Review images bucket (publicly accessible)
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-images', 'review-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STORAGE POLICIES FOR PRODUCT IMAGES
-- ============================================================================

-- Anyone can view product images
CREATE POLICY "Product images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Only admins can upload product images
CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'product-images'
    AND EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- Only admins can update product images
CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'product-images'
    AND EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- Only admins can delete product images
CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'product-images'
    AND EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text = 'admin'
    )
);

-- ============================================================================
-- STORAGE POLICIES FOR AVATARS
-- ============================================================================

-- Anyone can view avatars
CREATE POLICY "Avatars are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Users can upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================================================
-- STORAGE POLICIES FOR BLOG IMAGES
-- ============================================================================

-- Anyone can view blog images
CREATE POLICY "Blog images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Admins and authors can upload blog images
CREATE POLICY "Admins can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'blog-images'
    AND EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text IN ('admin', 'author')
    )
);

-- Admins and authors can manage blog images
CREATE POLICY "Admins can manage blog images"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'blog-images'
    AND EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text IN ('admin', 'author')
    )
);

CREATE POLICY "Admins can delete blog images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'blog-images'
    AND EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid()
        AND (preferences->>'role')::text IN ('admin', 'author')
    )
);

-- ============================================================================
-- STORAGE POLICIES FOR REVIEW IMAGES
-- ============================================================================

-- Anyone can view review images
CREATE POLICY "Review images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'review-images');

-- Authenticated users can upload review images
CREATE POLICY "Users can upload review images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'review-images'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own review images
CREATE POLICY "Users can delete their own review images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'review-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================================================
-- FILE SIZE AND TYPE RESTRICTIONS
-- ============================================================================

-- Create function to validate file uploads
CREATE OR REPLACE FUNCTION validate_file_upload()
RETURNS TRIGGER AS $$
BEGIN
    -- Max file size: 5MB
    IF NEW.size > 5242880 THEN
        RAISE EXCEPTION 'File size exceeds 5MB limit';
    END IF;
    
    -- Allowed image types
    IF NEW.mime_type NOT IN (
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif'
    ) THEN
        RAISE EXCEPTION 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply validation trigger to storage.objects
CREATE TRIGGER validate_storage_uploads
BEFORE INSERT ON storage.objects
FOR EACH ROW
EXECUTE FUNCTION validate_file_upload();

SELECT 'Storage buckets created successfully!' as status;
