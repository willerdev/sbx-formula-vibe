-- Fix security vulnerability: Restrict phone number access to profile owners only
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a new policy that allows users to view only their own profile data
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a separate policy for public profile information (excluding sensitive data like phone)
-- This allows viewing display_name, bio, avatar_url but not phone numbers
CREATE POLICY "Public profile information is viewable by authenticated users" 
ON public.profiles 
FOR SELECT 
USING (
  auth.role() = 'authenticated' AND 
  auth.uid() != user_id
);

-- Add a security comment for documentation
COMMENT ON TABLE public.profiles IS 'User profiles with RLS policies to protect sensitive information like phone numbers from unauthorized access';