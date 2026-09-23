import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BookOpen, Users } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { fetchPlans, formatPlanPrice, type Plan } from "@/lib/siteContent";
import { useToast } from "@/hooks/use-toast";

interface OutletContext {
  isMobile?: boolean;
}

const planIcons = {
  "premium-signals": <Bell className="w-8 h-8" />,
  "online-mentorship": <BookOpen className="w-8 h-8" />,
  "physical-mentorship": <Users className="w-8 h-8" />,
};

export const Subscription = () => {
  const { isMobile = false } = useOutletContext<OutletContext>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    fetchPlans().then((rows) => {
      if (rows) setPlans(rows);
    });
  }, []);

  const selectPlan = async (plan: Plan) => {
    const price = formatPlanPrice(plan.price_amount, plan.billing_period);
    const { error } = await supabase.from("plan_requests").insert({
      user_id: user?.id,
      plan_id: plan.id,
      plan_name: plan.name,
      email: user?.email,
    });

    if (error) {
      toast({ title: "Could not save request", description: error.message });
      return;
    }

    window.open(
      `https://wa.me/250788974179?text=${encodeURIComponent(`Hi, I would like to subscribe to the ${plan.name} plan at ${price}.`)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className={isMobile ? "p-4" : "p-6"}>
          <h1 className={`font-bold text-foreground ${isMobile ? "text-xl" : "text-3xl"}`}>
            My Subscription
          </h1>
          <p className={`text-muted-foreground ${isMobile ? "mt-1 text-sm" : "mt-2"}`}>
            Manage your subscription and upgrade your plan
          </p>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto ${isMobile ? "p-4" : "p-6"}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="flex flex-col gap-4">
              <Card className={`relative p-6 sm:p-8 gradient-card border-gradient transition-all duration-300 ${
                plan.is_popular ? "ring-2 ring-primary glow-primary" : ""
              }`}>
                {plan.is_popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="gradient-primary text-primary-foreground px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl ${plan.is_popular ? "gradient-primary text-primary-foreground" : "bg-accent/10 text-accent"}`}>
                    {planIcons[plan.slug as keyof typeof planIcons] ?? <Bell className="w-8 h-8" />}
                  </div>
                </div>

                <h3 className="font-space-grotesk font-bold text-xl sm:text-2xl mb-4 text-foreground">
                  {plan.name}
                </h3>

                <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                      <span className="text-sm sm:text-base text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-2xl sm:text-3xl font-bold text-gradient-primary">
                  {formatPlanPrice(plan.price_amount, plan.billing_period)}
                </div>
              </Card>

              <Button
                variant="success"
                className="w-full"
                size="lg"
                onClick={() => selectPlan(plan)}
              >
                Select Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
