"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Star,
  MoreHorizontal,
  Trash2,
  Edit,
  Copy,
  Library,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/store";
import { api } from "@/services/api";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/shared/page-transition";
import { EmptyState } from "@/components/shared/empty-state";
import { toast } from "sonner";
import type { Prompt } from "@/types";

const categories = ["All", "Development", "Writing", "Marketing", "Analysis", "Creative"];

export default function PromptsPage() {
  const { prompts, setPrompts, addPrompt, updatePrompt, deletePrompt, toggleFavoritePrompt } = useAppStore();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDialog, setShowDialog] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [form, setForm] = useState({ title: "", content: "", tags: "", category: "Development" });

  useEffect(() => {
    if (prompts.length === 0) {
      api.getPrompts().then(setPrompts);
    }
  }, [prompts.length, setPrompts]);

  const filtered = prompts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  function handleSave() {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    if (editingPrompt) {
      updatePrompt(editingPrompt.id, { ...form, tags, updatedAt: new Date().toISOString() });
      toast.success("Prompt updated");
    } else {
      const newPrompt: Prompt = {
        id: `p-${Date.now()}`,
        title: form.title,
        content: form.content,
        tags,
        category: form.category,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addPrompt(newPrompt);
      toast.success("Prompt created");
    }
    resetForm();
  }

  function resetForm() {
    setShowDialog(false);
    setEditingPrompt(null);
    setForm({ title: "", content: "", tags: "", category: "Development" });
  }

  function handleEdit(prompt: Prompt) {
    setEditingPrompt(prompt);
    setForm({ title: prompt.title, content: prompt.content, tags: prompt.tags.join(", "), category: prompt.category });
    setShowDialog(true);
  }

  return (
    <PageTransition className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Prompt Library</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Save and organize your best prompts
          </p>
        </div>
        <Button
          onClick={() => setShowDialog(true)}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Prompt
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 border-white/10 bg-white/5"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "shrink-0",
                selectedCategory === cat
                  ? "bg-violet-600 hover:bg-violet-700 text-white"
                  : "border-white/10 hover:bg-white/5"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Library}
          title="No prompts found"
          description={search ? "Try different search terms" : "Create your first prompt to get started"}
          action={!search ? { label: "Create Prompt", onClick: () => setShowDialog(true) } : undefined}
        />
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((prompt) => (
              <motion.div
                key={prompt.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="group border-white/5 bg-card/50 backdrop-blur-sm hover:border-violet-500/20 transition-all h-full">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-sm">{prompt.title}</h3>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleFavoritePrompt(prompt.id)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Star
                            className={cn(
                              "h-4 w-4",
                              prompt.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                            )}
                          />
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 hover:bg-white/10 rounded transition-colors opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleEdit(prompt)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { navigator.clipboard.writeText(prompt.content); toast.success("Copied!"); }}>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => { deletePrompt(prompt.id); toast.success("Deleted"); }}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-3 flex-1 mb-3">
                      {prompt.content}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {prompt.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-violet-500/10 text-violet-400 border-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <Dialog open={showDialog} onOpenChange={(open) => { if (!open) resetForm(); else setShowDialog(true); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPrompt ? "Edit Prompt" : "Create New Prompt"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Prompt title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                placeholder="Write your prompt..."
                rows={5}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="border-white/10 resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Tags (comma separated)</Label>
              <Input
                placeholder="development, react, optimization"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="border-white/10"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
              >
                {editingPrompt ? "Save Changes" : "Create Prompt"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
