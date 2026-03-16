"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  CreditCard,
  Check,
  ChevronRight,
  Download,
  Zap,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import { PageTransition } from "@/components/shared/page-transition";
import { DashboardSkeleton } from "@/components/shared/loading-skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
};

export default function BillingPage() {
  const [annual, setAnnual] = useState(false);

  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ["pricing-plans"],
    queryFn: api.getPricingPlans,
  });

  const { data: invoices, isLoading: invoicesLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: api.getInvoices,
  });

  if (plansLoading) return <DashboardSkeleton />;

  return (
    <PageTransition className="p-4 md:p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your subscription and billing details
        </p>
      </div>

      <Card className="border-violet-500/20 bg-gradient-to-r from-violet-500/5 to-indigo-500/5 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">Pro Plan</h2>
                  <Badge className="bg-violet-500/20 text-violet-400 border-0">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">$49/month &middot; Renews on April 1, 2024</p>
              </div>
            </div>
            <Button variant="outline" className="border-white/10">
              Manage Subscription <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Change Plan</h2>
          <div className="flex items-center gap-2">
            <Label htmlFor="annual" className="text-sm text-muted-foreground">Monthly</Label>
            <Switch id="annual" checked={annual} onCheckedChange={setAnnual} />
            <Label htmlFor="annual" className="text-sm text-muted-foreground">
              Annual <Badge variant="secondary" className="ml-1 text-xs bg-green-500/10 text-green-400">Save 20%</Badge>
            </Label>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {plans?.map((plan, i) => {
            const price = annual ? Math.floor(plan.price * 0.8) : plan.price;
            const isCurrent = plan.id === "pro";

            return (
              <motion.div key={plan.id} variants={fadeUp} custom={i}>
                <Card className={cn(
                  "relative overflow-hidden h-full transition-all",
                  plan.popular
                    ? "border-violet-500/50 shadow-lg shadow-violet-500/5"
                    : "border-white/5 bg-card/50"
                )}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                      Current Plan
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">${price}</span>
                      <span className="text-muted-foreground">/{annual ? "year" : "month"}</span>
                    </div>
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-violet-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={cn(
                        "w-full",
                        isCurrent
                          ? "bg-muted text-muted-foreground cursor-default"
                          : plan.popular
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                          : ""
                      )}
                      variant={isCurrent ? "secondary" : plan.popular ? "default" : "outline"}
                      disabled={isCurrent}
                      onClick={() => !isCurrent && toast.success(`Switched to ${plan.name} plan`)}
                    >
                      {isCurrent ? "Current Plan" : plan.price === 0 ? "Downgrade" : "Upgrade"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Payment Method</CardTitle>
            <Button variant="outline" size="sm" className="border-white/10">
              Update
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/2025</p>
            </div>
            <Badge variant="secondary" className="text-xs">Default</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {invoicesLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {invoices?.map((invoice, i) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-muted/50">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{invoice.description}</p>
                    <p className="text-xs text-muted-foreground">{invoice.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${invoice.amount}</p>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs",
                        invoice.status === "paid" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                      )}
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </PageTransition>
  );
}
