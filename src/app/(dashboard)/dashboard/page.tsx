"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Zap,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  TrendingUp,
  Clock,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageTransition } from "@/components/shared/page-transition";
import { DashboardSkeleton } from "@/components/shared/loading-skeleton";
import { api } from "@/services/api";
import { formatDistanceToNow } from "date-fns";

const COLORS = ["#8b5cf6", "#6366f1", "#7c3aed", "#4f46e5"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
};

export default function DashboardHome() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["usage-stats"],
    queryFn: api.getUsageStats,
  });

  const { data: activity, isLoading: activityLoading } = useQuery({
    queryKey: ["activity"],
    queryFn: api.getActivity,
  });

  if (statsLoading) return <DashboardSkeleton />;

  const statCards = [
    {
      title: "Total Tokens",
      value: stats ? `${(stats.totalTokens / 1_000_000).toFixed(1)}M` : "—",
      change: "+12.5%",
      trend: "up" as const,
      icon: Zap,
      color: "violet",
    },
    {
      title: "API Requests",
      value: stats ? stats.totalRequests.toLocaleString() : "—",
      change: "+8.2%",
      trend: "up" as const,
      icon: Activity,
      color: "indigo",
    },
    {
      title: "Conversations",
      value: stats ? stats.totalConversations.toString() : "—",
      change: "+23%",
      trend: "up" as const,
      icon: MessageSquare,
      color: "purple",
    },
    {
      title: "Avg Response",
      value: "1.2s",
      change: "-5%",
      trend: "down" as const,
      icon: Clock,
      color: "blue",
    },
  ];

  return (
    <PageTransition className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of your AI usage and activity
        </p>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statCards.map((card, i) => (
          <motion.div key={card.title} variants={fadeUp} custom={i}>
            <Card className="border-white/5 bg-card/50 backdrop-blur-sm hover:border-white/10 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-violet-500/10">
                    <card.icon className="h-4 w-4 text-violet-400" />
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${card.trend === "up" ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"}`}
                  >
                    {card.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-0.5" />
                    )}
                    {card.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{card.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible" className="lg:col-span-2">
          <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Token Usage</CardTitle>
                <Badge variant="secondary" className="text-xs">Last 30 days</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats?.dailyUsage?.slice(-14)} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#888" }} tickFormatter={(v) => v.slice(5)} />
                    <YAxis tick={{ fontSize: 11, fill: "#888" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }}
                      labelStyle={{ color: "#888" }}
                      formatter={(value) => [`${Number(value).toLocaleString()} tokens`, "Usage"]}
                    />
                    <Area type="monotone" dataKey="tokens" stroke="#8b5cf6" fill="url(#tokenGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible">
          <Card className="border-white/5 bg-card/50 backdrop-blur-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Model Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats?.modelUsage}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="tokens"
                      paddingAngle={4}
                    >
                      {stats?.modelUsage?.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {stats?.modelUsage?.map((model, i) => (
                  <div key={model.model} className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-sm flex-1">{model.model}</span>
                    <span className="text-sm text-muted-foreground">{model.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={fadeUp} custom={6} initial="hidden" animate="visible">
          <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Usage Quota</CardTitle>
                <Badge variant="secondary" className="text-xs bg-violet-500/10 text-violet-400">Pro Plan</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Tokens</span>
                  <span className="text-muted-foreground">{stats ? `${(stats.totalTokens / 1_000_000).toFixed(1)}M / 5M` : "—"}</span>
                </div>
                <Progress value={stats ? (stats.totalTokens / 5_000_000) * 100 : 0} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>API Requests</span>
                  <span className="text-muted-foreground">{stats ? `${stats.totalRequests.toLocaleString()} / 10,000` : "—"}</span>
                </div>
                <Progress value={stats ? (stats.totalRequests / 10000) * 100 : 0} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Team Members</span>
                  <span className="text-muted-foreground">5 / 5</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp} custom={7} initial="hidden" animate="visible">
          <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex gap-3 animate-pulse">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3 w-32 bg-muted rounded" />
                          <div className="h-3 w-48 bg-muted rounded" />
                        </div>
                      </div>
                    ))
                  : activity?.slice(0, 5).map((item) => {
                      const icons: Record<string, typeof Zap> = {
                        chat: MessageSquare,
                        prompt: Layers,
                        team: Activity,
                        billing: TrendingUp,
                        settings: Activity,
                      };
                      const Icon = icons[item.type] || Activity;
                      return (
                        <div key={item.id} className="flex items-start gap-3">
                          <div className="p-1.5 rounded-full bg-muted/50 mt-0.5">
                            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                      );
                    })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}
