-- Run once in the Supabase SQL editor.
-- Lets NOWPayments mark a plan request as pending, paid, or failed.

ALTER TABLE public.plan_requests
  ADD COLUMN IF NOT EXISTS payment_id text;

ALTER TABLE public.plan_requests
  DROP CONSTRAINT IF EXISTS plan_requests_status_check;

ALTER TABLE public.plan_requests
  ADD CONSTRAINT plan_requests_status_check
  CHECK (status IN ('new', 'pending', 'paid', 'failed', 'contacted', 'closed'));
