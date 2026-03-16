import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Conversation, Message, Notification, Prompt } from "@/types";

interface AppState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;

  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  user: User | null;
  setUser: (user: User | null) => void;

  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  conversations: Conversation[];
  activeConversationId: string | null;
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (id: string | null) => void;
  addConversation: (conversation: Conversation) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, content: string) => void;
  deleteConversation: (id: string) => void;

  prompts: Prompt[];
  setPrompts: (prompts: Prompt[]) => void;
  addPrompt: (prompt: Prompt) => void;
  updatePrompt: (id: string, prompt: Partial<Prompt>) => void;
  deletePrompt: (id: string) => void;
  toggleFavoritePrompt: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      theme: "dark",
      setTheme: (theme) => set({ theme }),

      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

      user: {
        id: "1",
        email: "alex@neuralarc.ai",
        name: "Alex Morgan",
        avatar: undefined,
        role: "owner",
        plan: "pro",
        createdAt: "2024-01-15T00:00:00Z",
      },
      setUser: (user) => set({ user }),

      notifications: [
        {
          id: "1",
          title: "Welcome to NeuralArc",
          description: "Get started by exploring the AI chat or prompt library.",
          type: "info",
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Usage limit warning",
          description: "You've used 80% of your monthly token quota.",
          type: "warning",
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ],
      addNotification: (notification) =>
        set((s) => ({ notifications: [notification, ...s.notifications] })),
      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      clearNotifications: () => set({ notifications: [] }),

      conversations: [],
      activeConversationId: null,
      setConversations: (conversations) => set({ conversations }),
      setActiveConversation: (id) => set({ activeConversationId: id }),
      addConversation: (conversation) =>
        set((s) => ({
          conversations: [conversation, ...s.conversations],
          activeConversationId: conversation.id,
        })),
      addMessage: (conversationId, message) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? { ...c, messages: [...c.messages, message], updatedAt: new Date().toISOString() }
              : c
          ),
        })),
      updateMessage: (conversationId, messageId, content) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === messageId ? { ...m, content, isStreaming: false } : m
                  ),
                }
              : c
          ),
        })),
      deleteConversation: (id) =>
        set((s) => ({
          conversations: s.conversations.filter((c) => c.id !== id),
          activeConversationId:
            s.activeConversationId === id ? null : s.activeConversationId,
        })),

      prompts: [],
      setPrompts: (prompts) => set({ prompts }),
      addPrompt: (prompt) =>
        set((s) => ({ prompts: [prompt, ...s.prompts] })),
      updatePrompt: (id, prompt) =>
        set((s) => ({
          prompts: s.prompts.map((p) => (p.id === id ? { ...p, ...prompt } : p)),
        })),
      deletePrompt: (id) =>
        set((s) => ({ prompts: s.prompts.filter((p) => p.id !== id) })),
      toggleFavoritePrompt: (id) =>
        set((s) => ({
          prompts: s.prompts.map((p) =>
            p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
          ),
        })),
    }),
    {
      name: "neuralarc-storage",
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
