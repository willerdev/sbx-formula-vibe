-- Run once in the Supabase SQL editor.
-- Renames the signals plan and stores the editable indices and stats.

UPDATE public.plans
SET
  name = 'SBX Formula Trading Bot',
  price_amount = 50,
  features = ARRAY['Real-time alerts', '78% accuracy', 'Risk management', 'SBX Formula Trading Bot']
WHERE slug = 'premium-signals';

UPDATE public.plans
SET features = array_replace(features, 'Premium signals access', 'SBX Formula Trading Bot')
WHERE 'Premium signals access' = ANY (features);

INSERT INTO public.site_settings (key, value)
VALUES
  (
    'traded_indices',
    E'Vol 25 (1s)\nVol 50 (1s)\nVol 75 (1s)\nVol 150 (1s)\nVol 25\nVol 50\nVol 75\nJump 50\nJump 100'
  ),
  (
    'site_stats',
    '[{"number":"2000+","label":"Current Members"},{"number":"1200+","label":"Chat Members"},{"number":"1500+","label":"Signals Received"},{"number":"1350+","label":"Won Signals"}]'
  )
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value;
