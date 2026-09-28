-- Run once in the Supabase SQL editor.
-- Visitors start a chat with a name and email. Admins reply from the admin page.

CREATE TABLE IF NOT EXISTS public.support_chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_name text NOT NULL,
  visitor_email text NOT NULL,
  access_token text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id uuid NOT NULL REFERENCES public.support_chats (id) ON DELETE CASCADE,
  sender text NOT NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT support_messages_sender_check CHECK (sender IN ('visitor', 'admin')),
  CONSTRAINT support_messages_body_check CHECK (char_length(body) BETWEEN 1 AND 2000)
);

CREATE INDEX IF NOT EXISTS support_messages_chat_id_idx
  ON public.support_messages (chat_id, created_at);

DROP TRIGGER IF EXISTS update_support_chats_updated_at ON public.support_chats;
CREATE TRIGGER update_support_chats_updated_at
BEFORE UPDATE ON public.support_chats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.touch_support_chat()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.support_chats
  SET updated_at = now()
  WHERE id = NEW.chat_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS touch_support_chat ON public.support_messages;
CREATE TRIGGER touch_support_chat
AFTER INSERT ON public.support_messages
FOR EACH ROW
EXECUTE FUNCTION public.touch_support_chat();

ALTER TABLE public.support_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins read support chats" ON public.support_chats;
CREATE POLICY "Admins read support chats"
ON public.support_chats
FOR SELECT
TO authenticated
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins read support messages" ON public.support_messages;
CREATE POLICY "Admins read support messages"
ON public.support_messages
FOR SELECT
TO authenticated
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins reply to support chats" ON public.support_messages;
CREATE POLICY "Admins reply to support chats"
ON public.support_messages
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin() AND sender = 'admin');

REVOKE ALL ON public.support_chats FROM PUBLIC, anon;
REVOKE ALL ON public.support_messages FROM PUBLIC, anon;
GRANT SELECT ON public.support_chats TO authenticated;
GRANT SELECT, INSERT ON public.support_messages TO authenticated;

CREATE OR REPLACE FUNCTION public.start_support_chat(p_name text, p_email text)
RETURNS TABLE (id uuid, access_token text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  new_id uuid;
  new_token text;
  clean_name text;
  clean_email text;
BEGIN
  clean_name := trim(coalesce(p_name, ''));
  clean_email := lower(trim(coalesce(p_email, '')));

  IF char_length(clean_name) < 1 OR char_length(clean_name) > 80 THEN
    RAISE EXCEPTION 'Enter your name';
  END IF;

  IF clean_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR char_length(clean_email) > 160 THEN
    RAISE EXCEPTION 'Enter a valid email';
  END IF;

  new_token := encode(gen_random_bytes(24), 'hex');

  INSERT INTO public.support_chats (visitor_name, visitor_email, access_token)
  VALUES (clean_name, clean_email, new_token)
  RETURNING support_chats.id INTO new_id;

  RETURN QUERY SELECT new_id, new_token;
END;
$$;

CREATE OR REPLACE FUNCTION public.visitor_support_messages(p_chat_id uuid, p_token text)
RETURNS TABLE (id uuid, sender text, body text, created_at timestamptz)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM public.support_chats
    WHERE support_chats.id = p_chat_id
      AND support_chats.access_token = p_token
  ) THEN
    RAISE EXCEPTION 'Chat not found';
  END IF;

  RETURN QUERY
  SELECT m.id, m.sender, m.body, m.created_at
  FROM public.support_messages m
  WHERE m.chat_id = p_chat_id
  ORDER BY m.created_at ASC;
END;
$$;

CREATE OR REPLACE FUNCTION public.visitor_send_support_message(p_chat_id uuid, p_token text, p_body text)
RETURNS TABLE (id uuid, sender text, body text, created_at timestamptz)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  clean_body text;
  new_id uuid;
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM public.support_chats
    WHERE support_chats.id = p_chat_id
      AND support_chats.access_token = p_token
  ) THEN
    RAISE EXCEPTION 'Chat not found';
  END IF;

  clean_body := trim(coalesce(p_body, ''));
  IF char_length(clean_body) < 1 OR char_length(clean_body) > 2000 THEN
    RAISE EXCEPTION 'Enter a message';
  END IF;

  INSERT INTO public.support_messages (chat_id, sender, body)
  VALUES (p_chat_id, 'visitor', clean_body)
  RETURNING support_messages.id INTO new_id;

  RETURN QUERY
  SELECT m.id, m.sender, m.body, m.created_at
  FROM public.support_messages m
  WHERE m.id = new_id;
END;
$$;

REVOKE ALL ON FUNCTION public.start_support_chat(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.visitor_support_messages(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.visitor_send_support_message(uuid, text, text) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.start_support_chat(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.visitor_support_messages(uuid, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.visitor_send_support_message(uuid, text, text) TO anon, authenticated;

NOTIFY pgrst, 'reload schema';
