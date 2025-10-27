-- Quick fix: Disable RLS on users table to stop infinite recursion
-- This allows the site to load properly
-- Run this in Supabase SQL Editor

ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Check if it worked
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'users';
