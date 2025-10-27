-- Make a user an admin
-- Replace 'your-email@example.com' with your actual email

UPDATE public.users
SET role = 'admin'
WHERE email = 'impritamray@gmail.com';

-- Verify the update
SELECT id, name, email, role
FROM public.users
WHERE email = 'your-email@example.com';

-- To make multiple users admins, use:
-- UPDATE public.users
-- SET role = 'admin'
-- WHERE email IN ('user1@example.com', 'user2@example.com');
