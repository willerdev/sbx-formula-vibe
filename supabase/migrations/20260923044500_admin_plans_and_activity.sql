-- Run this once in the Supabase SQL editor.
-- After it succeeds, create your account on the site, then run the
-- admin promotion statement at the bottom with your email.

-- ---------------------------------------------------------------------------
-- Admin role on profiles
-- ---------------------------------------------------------------------------

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user';

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check CHECK (role IN ('user', 'admin'));

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  );
$$;

-- Logged-in users cannot promote themselves. The SQL editor (no auth.uid) can.
CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF auth.uid() IS NOT NULL AND NOT public.is_admin() THEN
      NEW.role := 'user';
    END IF;
    RETURN NEW;
  END IF;

  IF NEW.role IS DISTINCT FROM OLD.role
     AND auth.uid() IS NOT NULL
     AND NOT public.is_admin() THEN
    NEW.role := OLD.role;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_profile_role ON public.profiles;
CREATE TRIGGER protect_profile_role
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.protect_profile_role();

-- ---------------------------------------------------------------------------
-- Plans the admin can edit. The public site reads active rows.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price_amount numeric(10, 2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  billing_period text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  is_popular boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT plans_billing_period_check CHECK (billing_period IN ('month', '2month'))
);

DROP TRIGGER IF EXISTS update_plans_updated_at ON public.plans;
CREATE TRIGGER update_plans_updated_at
BEFORE UPDATE ON public.plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.plans (slug, name, description, price_amount, billing_period, features, is_popular, sort_order)
VALUES
  (
    'premium-signals',
    'SBX Formula Trading Bot',
    'Receive real-time trading signals with 78% accuracy using our SBX Formula. Pure price action signals for synthetic indices.',
    40,
    'month',
    ARRAY['Real-time alerts', '78% accuracy', 'Risk management', 'Premium signals access'],
    true,
    1
  ),
  (
    'online-mentorship',
    '1-on-1 Online Mentorship',
    'Learn the SBX Formula in 1-on-1 online mentorship. Master price action trading for Deriv synthetic indices.',
    130,
    '2month',
    ARRAY['Online sessions', 'SBX Formula training', 'Risk management', 'Premium signals access'],
    false,
    2
  ),
  (
    'physical-mentorship',
    '1-on-1 Physical Mentorship',
    'Get personalized in-person trading guidance from Savii Banks. Master advanced SBX strategies with direct mentorship.',
    350,
    '2month',
    ARRAY['Personal mentor', 'Market analysis', 'Advanced SBX strategies', 'Risk management', 'Premium signals access'],
    false,
    3
  )
ON CONFLICT (slug) DO NOTHING;

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Active plans are public" ON public.plans;
CREATE POLICY "Active plans are public"
ON public.plans
FOR SELECT
TO anon, authenticated
USING (is_active OR public.is_admin());

DROP POLICY IF EXISTS "Admins manage plans" ON public.plans;
CREATE POLICY "Admins manage plans"
ON public.plans
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ---------------------------------------------------------------------------
-- Editable site values (accuracy, contact, quote)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (key, value)
VALUES
  ('signals_accuracy', '78%'),
  ('contact_address', 'Kigali KK 200St'),
  ('contact_phone', '+250 788 974 179'),
  ('whatsapp_url', 'https://chat.whatsapp.com/Jt9GTVG3w2nHyyhJGSYuMj?mode=wwc'),
  ('instagram_url', 'https://www.instagram.com/savii.banks?igsh=YzBmeDN1Nm1kY3gy&utm_source=qr'),
  ('quote_title', 'WE ARE SAVII BANKS FX GROUP'),
  ('quote_body', 'WE PLAN OUR TRADES AND TRADE OUR PLANS EVERY TIME')
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Settings are public" ON public.site_settings;
CREATE POLICY "Settings are public"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Admins manage settings" ON public.site_settings;
CREATE POLICY "Admins manage settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ---------------------------------------------------------------------------
-- What people asked for
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.plan_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  plan_id uuid REFERENCES public.plans (id) ON DELETE SET NULL,
  plan_name text NOT NULL,
  contact_name text,
  email text,
  phone text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT plan_requests_status_check CHECK (status IN ('new', 'contacted', 'closed'))
);

ALTER TABLE public.plan_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users submit their own request" ON public.plan_requests;
CREATE POLICY "Users submit their own request"
ON public.plan_requests
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Visitors can leave a request" ON public.plan_requests;
CREATE POLICY "Visitors can leave a request"
ON public.plan_requests
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

DROP POLICY IF EXISTS "Users read their own requests" ON public.plan_requests;
CREATE POLICY "Users read their own requests"
ON public.plan_requests
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Admins update requests" ON public.plan_requests;
CREATE POLICY "Admins update requests"
ON public.plan_requests
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ---------------------------------------------------------------------------
-- Activity the admin can review
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  action text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins read activity" ON public.activity_log;
CREATE POLICY "Admins read activity"
ON public.activity_log
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE OR REPLACE FUNCTION public.log_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.activity_log (user_id, action, details)
  VALUES (
    NEW.id,
    'signup',
    jsonb_build_object('email', NEW.email)
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS log_signup ON auth.users;
CREATE TRIGGER log_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.log_signup();

CREATE OR REPLACE FUNCTION public.log_profile_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.activity_log (user_id, action, details)
  VALUES (
    NEW.user_id,
    'profile_update',
    jsonb_build_object(
      'display_name', NEW.display_name,
      'phone', NEW.phone
    )
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS log_profile_update ON public.profiles;
CREATE TRIGGER log_profile_update
AFTER UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.log_profile_update();

CREATE OR REPLACE FUNCTION public.log_plan_request()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.activity_log (user_id, action, details)
  VALUES (
    NEW.user_id,
    'plan_request',
    jsonb_build_object(
      'request_id', NEW.id,
      'plan_name', NEW.plan_name,
      'email', NEW.email
    )
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS log_plan_request ON public.plan_requests;
CREATE TRIGGER log_plan_request
AFTER INSERT ON public.plan_requests
FOR EACH ROW
EXECUTE FUNCTION public.log_plan_request();

GRANT SELECT ON public.plans TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.plans TO authenticated;
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT SELECT, INSERT ON public.plan_requests TO anon, authenticated;
GRANT UPDATE ON public.plan_requests TO authenticated;
GRANT SELECT ON public.activity_log TO authenticated;

-- ---------------------------------------------------------------------------
-- Make your account the admin. Sign up on the site first, then run this
-- with that email. Leave it commented until the account exists.
-- ---------------------------------------------------------------------------

-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE user_id = (
--   SELECT id FROM auth.users WHERE email = 'you@example.com'
-- );
