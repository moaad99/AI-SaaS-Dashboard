"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  MessageSquare,
  BarChart3,
  Users,
  Check,
  Star,
  Github,
  Twitter,
  ChevronRight,
  Bot,
  Code2,
  Globe,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold">NeuralArc</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
              Get Started <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/15">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Now with GPT-4o & Claude 3.5
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          AI-powered platform
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            for modern teams
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10"
        >
          Streamline your AI workflows with intelligent chat, prompt management,
          team collaboration, and powerful analytics — all in one beautiful dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 h-12 text-base">
              Start free trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="px-8 h-12 text-base border-white/10 hover:bg-white/5">
              See how it works
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-2xl blur-2xl" />
          <div className="relative rounded-xl border border-white/10 bg-card/80 backdrop-blur-sm p-2 shadow-2xl">
            <div className="rounded-lg bg-gradient-to-br from-background to-muted/30 p-6 min-h-[300px] flex items-center justify-center">
              <div className="w-full max-w-3xl space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                  <span className="text-xs text-muted-foreground ml-2">NeuralArc Dashboard</span>
                </div>
                <div className="flex gap-4">
                  <div className="w-48 space-y-3 hidden sm:block">
                    {["Dashboard", "AI Chat", "Prompts", "Analytics"].map((item) => (
                      <div key={item} className="h-8 rounded-md bg-white/5 px-3 flex items-center text-xs text-muted-foreground">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Tokens Used", value: "2.4M" },
                        { label: "Requests", value: "8,320" },
                        { label: "Active Users", value: "156" },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-lg bg-white/5 p-3">
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                          <p className="text-lg font-bold">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg bg-white/5 p-4 h-32 flex items-end gap-1">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-violet-600 to-indigo-500"
                          style={{ height: `${Math.random() * 80 + 20}%`, opacity: 0.6 + Math.random() * 0.4 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

const features = [
  { icon: MessageSquare, title: "AI Chat Interface", description: "ChatGPT-like experience with streaming, markdown, and code highlighting built in." },
  { icon: Layers, title: "Prompt Library", description: "Save, organize, and share your best prompts with tags and categories." },
  { icon: BarChart3, title: "Usage Analytics", description: "Track token usage, costs, and performance across all your AI models." },
  { icon: Users, title: "Team Collaboration", description: "Invite your team, manage roles, and share workspaces seamlessly." },
  { icon: Shield, title: "Enterprise Security", description: "SOC 2 compliant with SSO, SAML, and advanced access controls." },
  { icon: Zap, title: "Multi-Model Support", description: "Use GPT-4, Claude, Gemini, and more from a single unified interface." },
  { icon: Code2, title: "API Access", description: "Full REST API with SDKs for Python, Node.js, and more." },
  { icon: Globe, title: "Global Infrastructure", description: "Low-latency edge deployment across 30+ regions worldwide." },
  { icon: Bot, title: "Custom Agents", description: "Build and deploy custom AI agents with your own data and tools." },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Features
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-bold mb-4">
            Everything you need for AI
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete platform to manage your AI workflows, from chat to analytics to team collaboration.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((f, i) => (
            <motion.div key={f.title} variants={fadeUp} custom={i}>
              <Card className="group relative overflow-hidden border-white/5 bg-card/50 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-2.5 rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 group-hover:from-violet-500/20 group-hover:to-indigo-500/20 transition-colors">
                    <f.icon className="h-5 w-5 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.div variants={fadeUp} custom={0}>
              <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
                AI Chat
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              The smartest AI chat experience
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mb-8 leading-relaxed">
              Interact with the latest AI models through our polished chat interface. Get streaming responses,
              syntax-highlighted code, and markdown rendering out of the box.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="space-y-3">
              {["Stream responses in real-time", "Syntax highlighting for 100+ languages", "Save & reuse conversations", "Export to Markdown or PDF"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-green-500/10">
                    <Check className="h-3.5 w-3.5 text-green-400" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} custom={2} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-2xl blur-xl" />
            <div className="relative rounded-xl border border-white/10 bg-card/80 backdrop-blur-sm p-4">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-violet-400" />
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-sm max-w-md">
                    <p className="text-muted-foreground">How can I optimize my React app&apos;s performance?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-2 max-w-md">
                    <p>Here are key optimization strategies:</p>
                    <div className="rounded-md bg-black/30 p-3 font-mono text-xs">
                      <span className="text-violet-400">const</span>{" "}
                      <span className="text-blue-400">MemoizedComponent</span> ={" "}
                      <span className="text-violet-400">React.memo</span>(...)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals getting started",
    features: ["50K tokens/month", "100 requests/day", "Basic models", "5 saved prompts", "Community support"],
  },
  {
    name: "Pro",
    price: "$49",
    description: "For professionals and small teams",
    popular: true,
    features: ["5M tokens/month", "10K requests/day", "All models", "Unlimited prompts", "Priority support", "Team workspace", "API access"],
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "For organizations at scale",
    features: ["Unlimited tokens", "Unlimited requests", "Fine-tuning", "Unlimited prompts", "Dedicated support", "SSO & SAML", "SLA guarantee"],
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Pricing
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-bold mb-4">
            Simple, transparent pricing
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan, i) => (
            <motion.div key={plan.name} variants={fadeUp} custom={i}>
              <Card className={`relative overflow-hidden h-full ${plan.popular ? "border-violet-500/50 shadow-lg shadow-violet-500/10" : "border-white/5"} bg-card/50 backdrop-blur-sm`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-violet-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button
                      className={`w-full ${plan.popular ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get started <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Sarah Chen", role: "CTO, TechFlow", content: "NeuralArc has transformed how our engineering team interacts with AI. The prompt library alone saved us hundreds of hours.", rating: 5 },
  { name: "Marcus Rivera", role: "Lead Developer, Nexus", content: "The best AI dashboard I've used. Clean interface, powerful features, and the team collaboration is seamless.", rating: 5 },
  { name: "Emily Zhao", role: "AI Researcher, DeepLab", content: "Finally a platform that understands what developers need. Multi-model support and analytics are game changers.", rating: 5 },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Testimonials
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-bold mb-4">
            Loved by developers
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div key={t.name} variants={fadeUp} custom={i}>
              <Card className="border-white/5 bg-card/50 backdrop-blur-sm h-full">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} custom={0} className="text-4xl sm:text-5xl font-bold mb-4">
            Ready to supercharge
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              your AI workflow?
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers and teams already using NeuralArc to build with AI.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 h-12 text-base">
                Start building for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold">NeuralArc</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} NeuralArc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
