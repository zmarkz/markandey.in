import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Search, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "The Lab — AI Experiments",
  description: "Interactive AI experiments. Play with them.",
};

const demos = [
  {
    href: "/lab/query-router",
    icon: Brain,
    title: "Query Router",
    description:
      "See how AI queries get classified as COMPLEX or SIMPLE and routed to the right model. Type any query and watch the routing decision in real-time.",
    label: "Classification",
  },
  {
    href: "/lab/rag",
    icon: Search,
    title: "RAG Search",
    description:
      "Semantic search over curated knowledge. Ask anything and see how the system retrieves relevant context and generates an answer.",
    label: "Retrieval",
  },
  {
    href: "/lab/agents",
    icon: Bot,
    title: "Agent Flow",
    description:
      "Watch queries flow through an AI agent orchestration pipeline. See gateway routing, tool calls, and streaming responses visualized step by step.",
    label: "Orchestration",
  },
];

export default function LabPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-white mb-2">
          THE LAB
        </h1>
        <p className="text-zinc-500 font-mono text-sm mb-12">
          Interactive AI experiments. Play with them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map(({ href, icon: Icon, title, description, label }) => (
            <Link key={href} href={href}>
              <div className="group h-full bg-[#12121a] border border-zinc-800/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <Icon
                      size={20}
                      className="text-indigo-400"
                    />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                    {label}
                  </span>
                </div>
                <h2 className="font-mono text-xl font-medium text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {title}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {description}
                </p>
                <span className="font-mono text-sm text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  Try it →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
