-- Run once in the Supabase SQL editor.
-- Lets each signed-in user upload a profile photo into the existing "profile" bucket.

UPDATE storage.buckets
SET public = true
WHERE id = 'profile';

DROP POLICY IF EXISTS "Public read profile images" ON storage.objects;
CREATE POLICY "Public read profile images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'profile');

DROP POLICY IF EXISTS "Users upload their profile image" ON storage.objects;
CREATE POLICY "Users upload their profile image"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users update their profile image" ON storage.objects;
CREATE POLICY "Users update their profile image"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users delete their profile image" ON storage.objects;
CREATE POLICY "Users delete their profile image"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
