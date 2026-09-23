import { supabase } from "@/integrations/supabase/client";

export type Plan = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_amount: number;
  billing_period: string;
  features: string[];
  is_popular: boolean;
  sort_order: number;
};

export type SiteSettings = Record<string, string>;

export const formatPlanPrice = (amount: number, period: string) => {
  const value = Number(amount);
  const shown = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return `$${shown}/${period}`;
};

export const fetchPlans = async () => {
  const { data, error } = await supabase
    .from("plans")
    .select("id, slug, name, description, price_amount, billing_period, features, is_popular, sort_order")
    .eq("is_active", true)
    .order("sort_order");

  if (error || !data) return null;
  return data as Plan[];
};

export const fetchSiteSettings = async () => {
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error || !data) return null;
  return Object.fromEntries(data.map((row) => [row.key, row.value])) as SiteSettings;
};
