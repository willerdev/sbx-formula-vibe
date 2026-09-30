import { supabase } from "@/integrations/supabase/client";

export const startPlanCheckout = async (planSlug: string) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.assign(`/auth?plan=${encodeURIComponent(planSlug)}`);
    return;
  }

  const response = await fetch("/api/nowpayments/invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ planSlug }),
  });
  const raw = await response.text();
  let payload: { error?: string; invoiceUrl?: string } = {};
  try {
    payload = raw ? JSON.parse(raw) : {};
  } catch {
    payload = {};
  }
  if (!response.ok || !payload.invoiceUrl) {
    throw new Error(payload.error || `Payment could not be started (${response.status}).`);
  }
  window.location.assign(payload.invoiceUrl);
};
