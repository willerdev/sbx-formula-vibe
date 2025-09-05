-- Remove the problematic RLS policy that exposes phone numbers
DROP POLICY IF EXISTS "Public profile information is viewable by authenticated users" ON public.profiles;

-- Update the existing policy to be more restrictive
-- Only allow users to view their own full profile (including phone)
-- This replaces the old policy that exposed phone numbers to all authenticated users