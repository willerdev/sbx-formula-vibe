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

export type SiteStat = {
  number: string;
  label: string;
};

export const defaultIndices = [
  "Vol 25 (1s)",
  "Vol 50 (1s)",
  "Vol 75 (1s)",
  "Vol 150 (1s)",
  "Vol 25",
  "Vol 50",
  "Vol 75",
  "Jump 50",
  "Jump 100",
];

export const defaultStats: SiteStat[] = [
  { number: "2000+", label: "Current Members" },
  { number: "1200+", label: "Chat Members" },
  { number: "1500+", label: "Signals Received" },
  { number: "1350+", label: "Won Signals" },
];

export const parseIndices = (value?: string) => {
  const items = value?.split("\n").map((item) => item.trim()).filter(Boolean);
  return items?.length ? items : defaultIndices;
};

export const parseStats = (value?: string): SiteStat[] => {
  if (!value) return defaultStats;
  try {
    const parsed = JSON.parse(value) as SiteStat[];
    if (Array.isArray(parsed) && parsed.every((item) => item.number && item.label)) return parsed;
  } catch {
    return defaultStats;
  }
  return defaultStats;
};

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
