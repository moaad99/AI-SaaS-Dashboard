"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Library,
  Users,
  CreditCard,
  Settings,
  Moon,
  Sun,
  Plus,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useAppStore } from "@/store";

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen, theme, setTheme } = useAppStore();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  function runCommand(cmd: () => void) {
    setCommandPaletteOpen(false);
    cmd();
  }

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/chat"))}>
            <MessageSquare className="mr-2 h-4 w-4" />
            AI Chat
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/prompts"))}>
            <Library className="mr-2 h-4 w-4" />
            Prompt Library
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/workspace"))}>
            <Users className="mr-2 h-4 w-4" />
            Workspace
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/billing"))}>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/chat"))}>
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}>
            {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            Toggle Theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
