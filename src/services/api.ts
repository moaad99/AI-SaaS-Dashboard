import type { Conversation, Message, Prompt, UsageStats, Invoice, TeamMember, ActivityItem, PricingPlan } from "@/types";
import { mockConversations, mockPrompts, mockUsageStats, mockInvoices, mockTeamMembers, mockActivity, mockPricingPlans } from "./mock-data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const api = {
  async getConversations(): Promise<Conversation[]> {
    await delay(600);
    return mockConversations;
  },

  async getConversation(id: string): Promise<Conversation | undefined> {
    await delay(300);
    return mockConversations.find((c) => c.id === id);
  },

  async sendMessage(conversationId: string, content: string): Promise<Message> {
    await delay(1000);
    return {
      id: `msg-${Date.now()}`,
      role: "assistant",
      content: generateMockResponse(content),
      createdAt: new Date().toISOString(),
    };
  },

  async getPrompts(): Promise<Prompt[]> {
    await delay(500);
    return mockPrompts;
  },

  async getUsageStats(): Promise<UsageStats> {
    await delay(700);
    return mockUsageStats;
  },

  async getInvoices(): Promise<Invoice[]> {
    await delay(400);
    return mockInvoices;
  },

  async getTeamMembers(): Promise<TeamMember[]> {
    await delay(500);
    return mockTeamMembers;
  },

  async getActivity(): Promise<ActivityItem[]> {
    await delay(400);
    return mockActivity;
  },

  async getPricingPlans(): Promise<PricingPlan[]> {
    await delay(300);
    return mockPricingPlans;
  },
};

function generateMockResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("code") || lower.includes("function") || lower.includes("implement")) {
    return `Here's an implementation approach:\n\n\`\`\`typescript\nexport async function processRequest(input: string) {\n  const validated = validateInput(input);\n  const result = await executeQuery(validated);\n  return formatResponse(result);\n}\n\`\`\`\n\nThis follows a clean architecture pattern with:\n- **Input validation** to prevent injection attacks\n- **Async processing** for non-blocking execution\n- **Response formatting** for consistent API output\n\nWould you like me to elaborate on any part?`;
  }
  if (lower.includes("explain") || lower.includes("what")) {
    return `Great question! Let me break this down:\n\n## Key Concepts\n\n1. **Architecture** - The system uses a layered approach separating concerns\n2. **Data Flow** - Unidirectional data flow ensures predictability\n3. **Error Handling** - Comprehensive error boundaries catch failures gracefully\n\n> The most important thing is maintaining clear separation of concerns.\n\nWould you like me to dive deeper into any of these areas?`;
  }
  return `I'd be happy to help with that. Here are my thoughts:\n\n- **First**, consider the requirements and constraints\n- **Second**, evaluate the available approaches\n- **Third**, implement with testing in mind\n\nThis ensures a robust and maintainable solution. Let me know if you'd like more specific guidance!`;
}
