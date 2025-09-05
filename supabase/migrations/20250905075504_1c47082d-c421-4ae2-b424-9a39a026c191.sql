-- Remove the problematic RLS policy that exposes phone numbers
DROP POLICY IF EXISTS "Public profile information is viewable by authenticated users" ON public.profiles;

-- Create a secure public view for profiles that only exposes safe fields
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  user_id,
  display_name,
  bio,
  avatar_url,
  created_at
FROM public.profiles;

-- Enable RLS on the view
ALTER VIEW public.public_profiles ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view public profile data
CREATE POLICY "Anyone can view public profile data" 
ON public.public_profiles 
FOR SELECT 
TO authenticated
USING (true);

-- Update the profiles table policies to be more restrictive
-- Only allow users to view their own full profile (including phone)
CREATE POLICY "Users can view only their own full profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);