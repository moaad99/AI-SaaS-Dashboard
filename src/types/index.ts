export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "owner" | "admin" | "member" | "viewer";
  plan: "free" | "pro" | "enterprise";
  createdAt: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  user: User;
  role: "owner" | "admin" | "member" | "viewer";
  joinedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  members: TeamMember[];
  plan: "free" | "pro" | "enterprise";
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export interface UsageStats {
  totalTokens: number;
  totalRequests: number;
  totalConversations: number;
  tokensUsedToday: number;
  requestsToday: number;
  dailyUsage: { date: string; tokens: number; requests: number }[];
  modelUsage: { model: string; tokens: number; percentage: number }[];
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed";
  date: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  popular?: boolean;
  tokenLimit: number;
  requestLimit: number;
}

export interface ActivityItem {
  id: string;
  type: "chat" | "prompt" | "team" | "billing" | "settings";
  title: string;
  description: string;
  timestamp: string;
}
