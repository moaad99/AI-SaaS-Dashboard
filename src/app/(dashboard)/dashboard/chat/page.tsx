"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Send,
  Plus,
  Copy,
  Check,
  Bot,
  User,
  Trash2,
  MoreHorizontal,
  Sparkles,
  Lightbulb,
  Code2,
  FileText,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";
import { api } from "@/services/api";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/shared/page-transition";
import type { Conversation, Message } from "@/types";

const promptTemplates = [
  { icon: Code2, label: "Write code", prompt: "Write a function that " },
  { icon: Lightbulb, label: "Explain concept", prompt: "Explain in simple terms how " },
  { icon: FileText, label: "Summarize", prompt: "Summarize the following text: " },
  { icon: Wand2, label: "Improve writing", prompt: "Improve the following text for clarity: " },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="p-1 rounded hover:bg-white/10 transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
    </button>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-3 px-4 py-4", isUser ? "bg-transparent" : "bg-muted/20")}
    >
      <div
        className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
          isUser
            ? "bg-gradient-to-br from-violet-500 to-indigo-600"
            : "bg-gradient-to-br from-emerald-500 to-teal-600"
        )}
      >
        {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{isUser ? "You" : "NeuralArc AI"}</span>
          {message.isStreaming && (
            <Badge variant="secondary" className="text-xs bg-violet-500/10 text-violet-400 animate-pulse">
              Generating...
            </Badge>
          )}
        </div>
        <div className="prose prose-sm prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const codeString = String(children).replace(/\n$/, "");
                if (match) {
                  return (
                    <div className="relative group rounded-lg overflow-hidden my-3">
                      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5">
                        <span className="text-xs text-muted-foreground">{match[1]}</span>
                        <CopyButton text={codeString} />
                      </div>
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ margin: 0, borderRadius: 0, padding: "1rem", fontSize: "0.8125rem" }}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  );
                }
                return (
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                );
              },
              p({ children }) {
                return <p className="mb-2 last:mb-0 text-sm leading-relaxed">{children}</p>;
              },
              ul({ children }) {
                return <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>;
              },
              li({ children }) {
                return <li className="text-sm">{children}</li>;
              },
              h2({ children }) {
                return <h2 className="text-base font-semibold mt-4 mb-2">{children}</h2>;
              },
              h3({ children }) {
                return <h3 className="text-sm font-semibold mt-3 mb-1">{children}</h3>;
              },
              blockquote({ children }) {
                return <blockquote className="border-l-2 border-violet-500/50 pl-3 italic text-muted-foreground">{children}</blockquote>;
              },
              strong({ children }) {
                return <strong className="font-semibold text-foreground">{children}</strong>;
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
      {!isUser && !message.isStreaming && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton text={message.content} />
        </div>
      )}
    </motion.div>
  );
}

function ConversationList() {
  const { conversations, activeConversationId, setActiveConversation, deleteConversation } = useAppStore();

  return (
    <div className="space-y-1">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className={cn(
            "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors",
            conv.id === activeConversationId
              ? "bg-violet-500/10 text-violet-400"
              : "text-muted-foreground hover:bg-white/5"
          )}
          onClick={() => setActiveConversation(conv.id)}
        >
          <MessageIcon className="h-4 w-4 shrink-0" />
          <span className="truncate flex-1">{conv.title}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/10 rounded" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => deleteConversation(conv.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return <Sparkles className={className} />;
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    conversations,
    activeConversationId,
    addConversation,
    addMessage,
    updateMessage,
    setActiveConversation,
    setConversations,
  } = useAppStore();

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  useEffect(() => {
    if (conversations.length === 0) {
      api.getConversations().then((convs) => {
        setConversations(convs);
        if (convs.length > 0) setActiveConversation(convs[0].id);
      });
    }
  }, [conversations.length, setConversations, setActiveConversation]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConversation?.messages]);

  const handleNewChat = useCallback(() => {
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      title: "New conversation",
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addConversation(newConv);
  }, [addConversation]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isGenerating) return;

    let convId = activeConversationId;
    if (!convId) {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        title: input.slice(0, 50),
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addConversation(newConv);
      convId = newConv.id;
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input.trim(),
      createdAt: new Date().toISOString(),
    };
    addMessage(convId, userMessage);

    const assistantMsgId = `msg-${Date.now() + 1}`;
    const streamingMsg: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
      isStreaming: true,
    };
    addMessage(convId, streamingMsg);

    setInput("");
    setIsGenerating(true);

    try {
      const response = await api.sendMessage(convId, input.trim());
      const words = response.content.split(" ");
      let accumulated = "";

      for (let i = 0; i < words.length; i++) {
        accumulated += (i === 0 ? "" : " ") + words[i];
        updateMessage(convId, assistantMsgId, accumulated);
        await new Promise((r) => setTimeout(r, 30));
      }
      updateMessage(convId, assistantMsgId, response.content);
    } catch {
      updateMessage(convId, assistantMsgId, "Sorry, something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [input, isGenerating, activeConversationId, addConversation, addMessage, updateMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PageTransition className="flex h-[calc(100vh-4rem)]">
      <div className="hidden lg:flex flex-col w-72 border-r border-white/5 bg-card/20">
        <div className="p-3">
          <Button
            onClick={handleNewChat}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
        <ScrollArea className="flex-1 px-3">
          <p className="text-xs font-medium text-muted-foreground px-3 mb-2 uppercase tracking-wider">
            Conversations
          </p>
          <ConversationList />
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {!activeConversation || activeConversation.messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-lg"
            >
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">How can I help you?</h2>
              <p className="text-muted-foreground text-sm mb-8">
                Ask me anything — from coding questions to creative writing, analysis to brainstorming.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {promptTemplates.map((tmpl) => (
                  <button
                    key={tmpl.label}
                    onClick={() => setInput(tmpl.prompt)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-card/30 hover:bg-card/50 hover:border-violet-500/20 transition-all text-left group"
                  >
                    <div className="p-2 rounded-lg bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors">
                      <tmpl.icon className="h-4 w-4 text-violet-400" />
                    </div>
                    <span className="text-sm">{tmpl.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <ScrollArea ref={scrollRef} className="flex-1">
            <div className="max-w-3xl mx-auto">
              <AnimatePresence>
                {activeConversation.messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        )}

        <div className="border-t border-white/5 bg-card/30 backdrop-blur-xl p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Send a message..."
                  rows={1}
                  className="min-h-[44px] max-h-[200px] resize-none border-white/10 bg-white/5 pr-12 focus-visible:ring-violet-500/50"
                />
                <Button
                  size="icon"
                  disabled={!input.trim() || isGenerating}
                  onClick={handleSend}
                  className="absolute right-2 bottom-1.5 h-8 w-8 bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-30"
                >
                  {isGenerating ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              NeuralArc can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
