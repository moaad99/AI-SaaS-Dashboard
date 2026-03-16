"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  Library,
  Users,
  CreditCard,
  Settings,
  Sparkles,
  ChevronLeft,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/chat", icon: MessageSquare, label: "AI Chat" },
  { href: "/dashboard/prompts", icon: Library, label: "Prompts" },
  { href: "/dashboard/workspace", icon: Users, label: "Workspace" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 72 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative hidden md:flex flex-col border-r border-white/5 bg-card/30 backdrop-blur-xl h-screen shrink-0"
    >
      <div className={cn("flex items-center h-16 px-4", sidebarOpen ? "justify-between" : "justify-center")}>
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-lg font-bold overflow-hidden whitespace-nowrap"
              >
                NeuralArc
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        {sidebarOpen && (
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={toggleSidebar}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="px-3 mb-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard/chat">
              <Button
                className={cn(
                  "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white",
                  sidebarOpen ? "w-full justify-start" : "w-10 h-10 p-0"
                )}
                size={sidebarOpen ? "default" : "icon"}
              >
                <Plus className="h-4 w-4 shrink-0" />
                {sidebarOpen && <span className="ml-2">New Chat</span>}
              </Button>
            </Link>
          </TooltipTrigger>
          {!sidebarOpen && <TooltipContent side="right">New Chat</TooltipContent>}
        </Tooltip>
      </div>

      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                      isActive
                        ? "bg-violet-500/10 text-violet-400"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                      !sidebarOpen && "justify-center px-0"
                    )}
                  >
                    <item.icon className="h-4.5 w-4.5 shrink-0" />
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isActive && sidebarOpen && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 w-0.5 h-5 rounded-r bg-violet-400"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                </TooltipTrigger>
                {!sidebarOpen && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            );
          })}
        </nav>
      </ScrollArea>

      {!sidebarOpen && (
        <div className="p-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 w-full" onClick={toggleSidebar}>
            <ChevronLeft className="h-4 w-4 rotate-180" />
          </Button>
        </div>
      )}
    </motion.aside>
  );
}
