import type {
  Conversation,
  Prompt,
  TeamMember,
  UsageStats,
  Invoice,
  PricingPlan,
  ActivityItem,
} from "@/types";

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    title: "React performance optimization",
    messages: [
      { id: "m1", role: "user", content: "How can I optimize React rendering performance?", createdAt: "2024-03-10T10:00:00Z" },
      {
        id: "m2",
        role: "assistant",
        content: `Here are key strategies for optimizing React rendering performance:\n\n## 1. Memoization\n\nUse \`React.memo()\` for components that receive the same props frequently:\n\n\`\`\`tsx\nconst ExpensiveComponent = React.memo(({ data }: Props) => {\n  return <div>{/* expensive render */}</div>;\n});\n\`\`\`\n\n## 2. useMemo & useCallback\n\nPrevent unnecessary recalculations:\n\n\`\`\`tsx\nconst sortedData = useMemo(() => \n  data.sort((a, b) => a.value - b.value), \n  [data]\n);\n\`\`\`\n\n## 3. Virtual Lists\n\nFor large lists, use virtualization libraries like \`@tanstack/react-virtual\`.\n\n## 4. Code Splitting\n\nLazy load components with \`React.lazy()\` and \`Suspense\`.`,
        createdAt: "2024-03-10T10:00:05Z",
      },
    ],
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:05Z",
  },
  {
    id: "conv-2",
    title: "Building a REST API with Node.js",
    messages: [
      { id: "m3", role: "user", content: "Help me design a REST API for an e-commerce platform", createdAt: "2024-03-09T14:00:00Z" },
      { id: "m4", role: "assistant", content: "I'd be happy to help you design a REST API for an e-commerce platform. Let me outline the key endpoints and architecture...", createdAt: "2024-03-09T14:00:05Z" },
    ],
    createdAt: "2024-03-09T14:00:00Z",
    updatedAt: "2024-03-09T14:00:05Z",
  },
  {
    id: "conv-3",
    title: "Database schema design",
    messages: [
      { id: "m5", role: "user", content: "What's the best way to design a schema for a multi-tenant SaaS app?", createdAt: "2024-03-08T09:00:00Z" },
      { id: "m6", role: "assistant", content: "Great question! For multi-tenant SaaS applications, there are three main approaches...", createdAt: "2024-03-08T09:00:05Z" },
    ],
    createdAt: "2024-03-08T09:00:00Z",
    updatedAt: "2024-03-08T09:00:05Z",
  },
];

export const mockPrompts: Prompt[] = [
  { id: "p1", title: "Code Review", content: "Review this code for best practices, performance issues, and potential bugs. Suggest improvements with explanations.", tags: ["development", "review"], category: "Development", isFavorite: true, createdAt: "2024-03-01T00:00:00Z", updatedAt: "2024-03-01T00:00:00Z" },
  { id: "p2", title: "Technical Writing", content: "Write clear technical documentation for the following feature. Include usage examples and API references.", tags: ["writing", "docs"], category: "Writing", isFavorite: false, createdAt: "2024-03-02T00:00:00Z", updatedAt: "2024-03-02T00:00:00Z" },
  { id: "p3", title: "SQL Query Builder", content: "Generate an optimized SQL query for the following requirements. Consider indexing and performance.", tags: ["database", "sql"], category: "Development", isFavorite: true, createdAt: "2024-03-03T00:00:00Z", updatedAt: "2024-03-03T00:00:00Z" },
  { id: "p4", title: "Bug Analysis", content: "Analyze this bug report and suggest potential root causes and debugging steps.", tags: ["debugging", "development"], category: "Development", isFavorite: false, createdAt: "2024-03-04T00:00:00Z", updatedAt: "2024-03-04T00:00:00Z" },
  { id: "p5", title: "Email Composer", content: "Draft a professional email for the following scenario. Keep it concise and action-oriented.", tags: ["writing", "communication"], category: "Writing", isFavorite: false, createdAt: "2024-03-05T00:00:00Z", updatedAt: "2024-03-05T00:00:00Z" },
  { id: "p6", title: "API Design", content: "Design a RESTful API endpoint for the following feature. Include request/response schemas.", tags: ["api", "development"], category: "Development", isFavorite: true, createdAt: "2024-03-06T00:00:00Z", updatedAt: "2024-03-06T00:00:00Z" },
];

export const mockTeamMembers: TeamMember[] = [
  { id: "tm1", user: { id: "1", email: "alex@neuralarc.ai", name: "Alex Morgan", role: "owner", plan: "pro", createdAt: "2024-01-15T00:00:00Z" }, role: "owner", joinedAt: "2024-01-15T00:00:00Z" },
  { id: "tm2", user: { id: "2", email: "sarah@neuralarc.ai", name: "Sarah Chen", role: "admin", plan: "pro", createdAt: "2024-02-01T00:00:00Z" }, role: "admin", joinedAt: "2024-02-01T00:00:00Z" },
  { id: "tm3", user: { id: "3", email: "james@neuralarc.ai", name: "James Wilson", role: "member", plan: "pro", createdAt: "2024-02-15T00:00:00Z" }, role: "member", joinedAt: "2024-02-15T00:00:00Z" },
  { id: "tm4", user: { id: "4", email: "maya@neuralarc.ai", name: "Maya Patel", role: "member", plan: "pro", createdAt: "2024-03-01T00:00:00Z" }, role: "member", joinedAt: "2024-03-01T00:00:00Z" },
  { id: "tm5", user: { id: "5", email: "liam@neuralarc.ai", name: "Liam Rodriguez", role: "viewer", plan: "pro", createdAt: "2024-03-05T00:00:00Z" }, role: "viewer", joinedAt: "2024-03-05T00:00:00Z" },
];

export const mockUsageStats: UsageStats = {
  totalTokens: 2_450_000,
  totalRequests: 8_320,
  totalConversations: 156,
  tokensUsedToday: 45_200,
  requestsToday: 127,
  dailyUsage: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split("T")[0],
    tokens: Math.floor(Math.random() * 80000) + 20000,
    requests: Math.floor(Math.random() * 300) + 100,
  })),
  modelUsage: [
    { model: "GPT-4o", tokens: 1_200_000, percentage: 49 },
    { model: "GPT-4o Mini", tokens: 800_000, percentage: 33 },
    { model: "Claude 3.5", tokens: 350_000, percentage: 14 },
    { model: "Gemini Pro", tokens: 100_000, percentage: 4 },
  ],
};

export const mockInvoices: Invoice[] = [
  { id: "inv-1", amount: 49, currency: "USD", status: "paid", date: "2024-03-01", description: "Pro Plan - March 2024" },
  { id: "inv-2", amount: 49, currency: "USD", status: "paid", date: "2024-02-01", description: "Pro Plan - February 2024" },
  { id: "inv-3", amount: 49, currency: "USD", status: "paid", date: "2024-01-01", description: "Pro Plan - January 2024" },
  { id: "inv-4", amount: 29, currency: "USD", status: "paid", date: "2023-12-01", description: "Starter Plan - December 2023" },
];

export const mockPricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    tokenLimit: 50_000,
    requestLimit: 100,
    features: [
      "50K tokens/month",
      "100 requests/day",
      "Basic models access",
      "5 saved prompts",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    interval: "month",
    tokenLimit: 5_000_000,
    requestLimit: 10_000,
    popular: true,
    features: [
      "5M tokens/month",
      "10K requests/day",
      "All models access",
      "Unlimited prompts",
      "Priority support",
      "Team workspace (5 members)",
      "API access",
      "Custom integrations",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    interval: "month",
    tokenLimit: -1,
    requestLimit: -1,
    features: [
      "Unlimited tokens",
      "Unlimited requests",
      "All models + fine-tuning",
      "Unlimited prompts",
      "Dedicated support",
      "Unlimited team members",
      "Full API access",
      "Custom integrations",
      "SSO & SAML",
      "SLA guarantee",
    ],
  },
];

export const mockActivity: ActivityItem[] = [
  { id: "a1", type: "chat", title: "New conversation", description: "Started 'React performance optimization'", timestamp: new Date(Date.now() - 1800000).toISOString() },
  { id: "a2", type: "prompt", title: "Prompt saved", description: "Added 'Code Review' to library", timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "a3", type: "team", title: "Member joined", description: "Maya Patel joined the workspace", timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: "a4", type: "chat", title: "Conversation completed", description: "Finished 'Database schema design'", timestamp: new Date(Date.now() - 14400000).toISOString() },
  { id: "a5", type: "billing", title: "Payment processed", description: "Pro Plan subscription renewed", timestamp: new Date(Date.now() - 86400000).toISOString() },
  { id: "a6", type: "settings", title: "API key generated", description: "New production API key created", timestamp: new Date(Date.now() - 172800000).toISOString() },
];
