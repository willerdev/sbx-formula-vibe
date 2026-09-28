-- Run once in the Supabase SQL editor.
-- Lets an admin upload past-signal screenshots that the homepage can show.

CREATE TABLE IF NOT EXISTS public.past_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_path text NOT NULL,
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.past_signals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Past signals are public" ON public.past_signals;
CREATE POLICY "Past signals are public"
ON public.past_signals
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Admins manage past signals" ON public.past_signals;
CREATE POLICY "Admins manage past signals"
ON public.past_signals
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

GRANT SELECT ON public.past_signals TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.past_signals TO authenticated;

INSERT INTO storage.buckets (id, name, public)
VALUES ('past-signals', 'past-signals', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read past signal images" ON storage.objects;
CREATE POLICY "Public read past signal images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'past-signals');

DROP POLICY IF EXISTS "Admins upload past signal images" ON storage.objects;
CREATE POLICY "Admins upload past signal images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'past-signals' AND public.is_admin());

DROP POLICY IF EXISTS "Admins delete past signal images" ON storage.objects;
CREATE POLICY "Admins delete past signal images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'past-signals' AND public.is_admin());
