"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Key,
  Bell,
  Moon,
  Sun,
  Monitor,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/store";
import { PageTransition } from "@/components/shared/page-transition";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { user, theme, setTheme } = useAppStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeys] = useState([
    { id: "1", name: "Production", key: "sk-na-prod-xxxxxxxxxxxxxxxxxxxx", created: "2024-03-01", lastUsed: "2024-03-15" },
    { id: "2", name: "Development", key: "sk-na-dev-xxxxxxxxxxxxxxxxxxxxx", created: "2024-02-15", lastUsed: "2024-03-14" },
  ]);

  return (
    <PageTransition className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account preferences and API keys
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted/30 border border-white/5">
          <TabsTrigger value="profile" className="data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-400">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-400">
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-400">
            <Bell className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base">Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-2xl">
                    {user?.name?.split(" ").map((n) => n[0]).join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="border-white/10">
                    Upload photo
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG. Max size 2MB.</p>
                </div>
              </div>

              <Separator className="bg-white/5" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-white/10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-2">
                  <Label>Role</Label>
                  <Input value="Owner" readOnly className="border-white/10 bg-muted/20" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Plan</Label>
                  <div className="flex items-center gap-2 h-10 px-3 rounded-md border border-white/10 bg-muted/20">
                    <Badge className="bg-violet-500/20 text-violet-400 border-0">Pro</Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => toast.success("Profile updated")}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6">
          <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">API Keys</CardTitle>
                  <CardDescription>Manage API keys for external integrations</CardDescription>
                </div>
                <Button
                  size="sm"
                  onClick={() => toast.success("New API key generated")}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Generate Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apiKeys.map((apiKey) => (
                  <motion.div
                    key={apiKey.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-4 p-4 rounded-lg border border-white/5 bg-white/5"
                  >
                    <div className="p-2 rounded-lg bg-violet-500/10">
                      <Key className="h-4 w-4 text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{apiKey.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <code className="text-xs text-muted-foreground font-mono">
                          {showApiKey ? apiKey.key : apiKey.key.replace(/./g, "•").slice(0, 20) + "..."}
                        </code>
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created {apiKey.created} &middot; Last used {apiKey.lastUsed}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => { navigator.clipboard.writeText(apiKey.key); toast.success("Copied!"); }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base">API Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted/20 p-4 font-mono text-sm space-y-1">
                <p className="text-muted-foreground"># Example API call</p>
                <p><span className="text-violet-400">curl</span> -X POST https://api.neuralarc.ai/v1/chat \</p>
                <p className="pl-4">-H &quot;Authorization: Bearer sk-na-prod-xxx&quot; \</p>
                <p className="pl-4">-H &quot;Content-Type: application/json&quot; \</p>
                <p className="pl-4">{`-d '{"model": "gpt-4o", "message": "Hello"}'`}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base">Appearance</CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { value: "light" as const, icon: Sun, label: "Light" },
                    { value: "dark" as const, icon: Moon, label: "Dark" },
                    { value: "system" as const, icon: Monitor, label: "System" },
                  ]).map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTheme(t.value)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                        theme === t.value
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-white/5 hover:border-white/10 bg-white/5"
                      )}
                    >
                      <t.icon className={cn("h-5 w-5", theme === t.value ? "text-violet-400" : "text-muted-foreground")} />
                      <span className="text-sm">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/5" />

              <div className="space-y-3">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="border-white/10 w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Email notifications", desc: "Receive email for important updates", defaultChecked: true },
                { label: "Usage alerts", desc: "Get notified when approaching usage limits", defaultChecked: true },
                { label: "Product updates", desc: "New features and improvements", defaultChecked: false },
                { label: "Team notifications", desc: "Activity from team members", defaultChecked: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.defaultChecked} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base">AI Preferences</CardTitle>
              <CardDescription>Configure default AI behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Model</Label>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger className="border-white/10 w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                    <SelectItem value="claude-3.5">Claude 3.5 Sonnet</SelectItem>
                    <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Response Length</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger className="border-white/10 w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Stream responses</p>
                  <p className="text-xs text-muted-foreground">Show AI responses as they generate</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTransition>
  );
}
