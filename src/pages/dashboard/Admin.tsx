import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { defaultIndices, defaultStats, parseIndices, parseStats, type Plan, type SiteStat } from "@/lib/siteContent";

interface OutletContext {
  isMobile?: boolean;
}

type PlanDraft = Plan & { featuresText: string };
type RequestRow = {
  id: string;
  plan_name: string;
  email: string | null;
  contact_name: string | null;
  phone: string | null;
  status: string;
  created_at: string;
};
type ActivityRow = {
  id: string;
  action: string;
  details: Record<string, unknown> | null;
  created_at: string;
};
type SettingRow = { key: string; value: string };

const settingLabels: Record<string, string> = {
  signals_accuracy: "Signals accuracy",
  contact_address: "Address",
  contact_phone: "Phone",
  whatsapp_url: "WhatsApp link",
  instagram_url: "Instagram link",
  quote_title: "Quote title",
  quote_body: "Quote body",
};

export const Admin = () => {
  const { isMobile = false } = useOutletContext<OutletContext>();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [plans, setPlans] = useState<PlanDraft[]>([]);
  const [settings, setSettings] = useState<SettingRow[]>([]);
  const [indices, setIndices] = useState<string[]>(defaultIndices);
  const [stats, setStats] = useState<SiteStat[]>(defaultStats);
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [activity, setActivity] = useState<ActivityRow[]>([]);

  const load = async () => {
    const [planResult, settingResult, requestResult, activityResult] = await Promise.all([
      supabase.from("plans").select("*").order("sort_order"),
      supabase.from("site_settings").select("key, value").order("key"),
      supabase.from("plan_requests").select("id, plan_name, email, contact_name, phone, status, created_at").order("created_at", { ascending: false }),
      supabase.from("activity_log").select("id, action, details, created_at").order("created_at", { ascending: false }).limit(50),
    ]);

    if (planResult.data) {
      setPlans(planResult.data.map((plan) => ({
        ...plan,
        featuresText: (plan.features ?? []).join("\n"),
      })));
    }
    if (settingResult.data) {
      const rows = settingResult.data;
      setSettings(rows.filter((row) => row.key !== "traded_indices" && row.key !== "site_stats"));
      const stored = Object.fromEntries(rows.map((row) => [row.key, row.value]));
      setIndices(parseIndices(stored.traded_indices));
      setStats(parseStats(stored.site_stats));
    }
    if (requestResult.data) setRequests(requestResult.data);
    if (activityResult.data) setActivity(activityResult.data as ActivityRow[]);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const savePlan = async (plan: PlanDraft) => {
    const features = plan.featuresText.split("\n").map((line) => line.trim()).filter(Boolean);
    const { error } = await supabase.from("plans").update({
      name: plan.name,
      description: plan.description,
      price_amount: Number(plan.price_amount),
      billing_period: plan.billing_period,
      features,
      is_popular: plan.is_popular,
      is_active: plan.is_active,
    }).eq("id", plan.id);

    toast(error
      ? { title: "Plan not saved", description: error.message }
      : { title: "Plan saved", description: plan.name });
  };

  const saveSetting = async (setting: SettingRow) => {
    const { error } = await supabase.from("site_settings").update({ value: setting.value }).eq("key", setting.key);
    toast(error
      ? { title: "Setting not saved", description: error.message }
      : { title: "Setting saved", description: settingLabels[setting.key] ?? setting.key });
  };

  const saveIndices = async () => {
    const value = indices.map((item) => item.trim()).filter(Boolean).join("\n");
    const { error } = await supabase.from("site_settings").upsert({ key: "traded_indices", value });
    toast(error
      ? { title: "Indices not saved", description: error.message }
      : { title: "Indices saved" });
    if (!error) setIndices(value.split("\n"));
  };

  const saveStats = async () => {
    const value = JSON.stringify(stats.filter((stat) => stat.number.trim() && stat.label.trim()));
    const { error } = await supabase.from("site_settings").upsert({ key: "site_stats", value });
    toast(error
      ? { title: "Stats not saved", description: error.message }
      : { title: "Stats saved" });
  };

  const updateRequestStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("plan_requests").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Request not updated", description: error.message });
      return;
    }
    setRequests((rows) => rows.map((row) => row.id === id ? { ...row, status } : row));
  };

  if (!isAdmin) {
    return (
      <div className={isMobile ? "p-4" : "p-6"}>
        <h1 className="text-2xl font-bold text-foreground">Admin</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          This account is not an admin yet. In the Supabase SQL editor, run the promotion statement with {user?.email ?? "your signup email"}.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-10 ${isMobile ? "p-4" : "p-6"}`}>
      <div>
        <h1 className={`font-bold text-foreground ${isMobile ? "text-xl" : "text-3xl"}`}>Admin</h1>
        <p className="text-muted-foreground mt-2">Change prices and site text, and review what people requested.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Plans</h2>
        {plans.map((plan) => (
          <Card key={plan.id} className="p-4 space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input value={plan.name} onChange={(event) => setPlans((rows) => rows.map((row) => row.id === plan.id ? { ...row, name: event.target.value } : row))} />
              </div>
              <div>
                <Label>Price (USD)</Label>
                <Input type="number" value={plan.price_amount} onChange={(event) => setPlans((rows) => rows.map((row) => row.id === plan.id ? { ...row, price_amount: Number(event.target.value) } : row))} />
              </div>
              <div>
                <Label>Billing period</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={plan.billing_period}
                  onChange={(event) => setPlans((rows) => rows.map((row) => row.id === plan.id ? { ...row, billing_period: event.target.value } : row))}
                >
                  <option value="month">month</option>
                  <option value="2month">2month</option>
                </select>
              </div>
              <label className="flex items-end gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={plan.is_popular}
                  onChange={(event) => setPlans((rows) => rows.map((row) => row.id === plan.id ? { ...row, is_popular: event.target.checked } : row))}
                />
                Most popular
              </label>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={plan.description} onChange={(event) => setPlans((rows) => rows.map((row) => row.id === plan.id ? { ...row, description: event.target.value } : row))} />
            </div>
            <div>
              <Label>Features, one per line</Label>
              <Textarea value={plan.featuresText} onChange={(event) => setPlans((rows) => rows.map((row) => row.id === plan.id ? { ...row, featuresText: event.target.value } : row))} />
            </div>
            <Button onClick={() => savePlan(plan)}>Save plan</Button>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Indices we trade</h2>
        <Card className="p-4 space-y-3">
          {indices.map((indexName, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={indexName}
                onChange={(event) => setIndices((rows) => rows.map((row, rowIndex) => rowIndex === index ? event.target.value : row))}
              />
              <Button
                variant="outline"
                onClick={() => setIndices((rows) => rows.filter((_, rowIndex) => rowIndex !== index))}
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIndices((rows) => [...rows, ""])}>Add index</Button>
            <Button onClick={saveIndices}>Save indices</Button>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Stats</h2>
        <Card className="p-4 space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="grid gap-2 md:grid-cols-[160px_1fr_auto]">
              <Input
                value={stat.number}
                onChange={(event) => setStats((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, number: event.target.value } : row))}
              />
              <Input
                value={stat.label}
                onChange={(event) => setStats((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, label: event.target.value } : row))}
              />
              <Button
                variant="outline"
                onClick={() => setStats((rows) => rows.filter((_, rowIndex) => rowIndex !== index))}
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStats((rows) => [...rows, { number: "", label: "" }])}>Add stat</Button>
            <Button onClick={saveStats}>Save stats</Button>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Site text</h2>
        {settings.map((setting) => (
          <Card key={setting.key} className="p-4 space-y-2">
            <Label>{settingLabels[setting.key] ?? setting.key}</Label>
            <Textarea value={setting.value} onChange={(event) => setSettings((rows) => rows.map((row) => row.key === setting.key ? { ...row, value: event.target.value } : row))} />
            <Button onClick={() => saveSetting(setting)}>Save</Button>
          </Card>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Requests</h2>
        {requests.length === 0 && <p className="text-muted-foreground">No requests yet.</p>}
        {requests.map((request) => (
          <Card key={request.id} className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-foreground">{request.plan_name}</p>
              <p className="text-sm text-muted-foreground">
                {request.contact_name || request.email || "No contact"} · {new Date(request.created_at).toLocaleString()}
              </p>
            </div>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={request.status}
              onChange={(event) => updateRequestStatus(request.id, event.target.value)}
            >
              <option value="new">new</option>
              <option value="contacted">contacted</option>
              <option value="closed">closed</option>
            </select>
          </Card>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Activity</h2>
        {activity.length === 0 && <p className="text-muted-foreground">No activity yet.</p>}
        {activity.map((item) => (
          <Card key={item.id} className="p-4">
            <p className="font-medium text-foreground">{item.action}</p>
            <p className="text-sm text-muted-foreground">{new Date(item.created_at).toLocaleString()}</p>
            <p className="text-sm text-foreground mt-1 break-words">{JSON.stringify(item.details)}</p>
          </Card>
        ))}
      </section>
    </div>
  );
};
