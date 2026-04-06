import type { Metadata } from "next";
import { Badge } from "@/components/shared/Badge";

export const metadata: Metadata = {
  title: "The Stack — What This Site Runs On",
  description: "Full transparency on the technology behind markandey.in.",
};

const sections = [
  {
    title: "Frontend",
    items: [
      "Next.js 15 (App Router)",
      "React 19, TypeScript",
      "Tailwind CSS 4",
      "Framer Motion for animations",
      "MDX for blog content",
    ],
  },
  {
    title: "AI Agent",
    items: [
      "Qwen 2.5 Coder 14B via Ollama",
      "MCP Agent Farm for orchestration",
      "Cost: ₹0 per query (runs locally)",
    ],
  },
  {
    title: "Infrastructure",
    items: [
      "Docker Compose on AWS EC2",
      "Cloudflare Tunnel for HTTPS",
      "Nginx reverse proxy",
    ],
  },
  {
    title: "Monthly Cost",
    items: [
      "EC2: ~₹800/mo (shared with other projects)",
      "AI: ₹0 (local models)",
      "Domain: ₹800/yr",
      "Total: ~₹870/mo",
    ],
  },
];

export default function StackPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[900px] mx-auto">
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-white mb-2">
          THE STACK
        </h1>
        <p className="text-zinc-500 font-mono text-sm mb-12">
          What this website runs on. Full transparency.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-mono text-lg font-medium text-white mb-4 pb-2 border-b border-zinc-800/50">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm text-zinc-400 flex items-start gap-3"
                  >
                    <span className="text-indigo-500 mt-0.5">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Architecture diagram */}
        <div className="mt-12 bg-[#0d1117] border border-[#30363d] rounded-2xl p-8">
          <h3 className="font-mono text-sm text-zinc-500 mb-6">
            Architecture
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-sm">
            <Badge>Browser</Badge>
            <span className="text-zinc-600">→</span>
            <Badge>Cloudflare</Badge>
            <span className="text-zinc-600">→</span>
            <Badge>Nginx</Badge>
            <span className="text-zinc-600">→</span>
            <Badge>Next.js</Badge>
            <span className="text-zinc-600">→</span>
            <Badge>Agent Farm</Badge>
            <span className="text-zinc-600">→</span>
            <Badge>Ollama</Badge>
          </div>
        </div>

        {/* Source code */}
        <div className="mt-8 bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6">
          <h3 className="font-mono text-sm text-zinc-500 mb-2">Source Code</h3>
          <a
            href="https://github.com/markandey/markandey.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            github.com/markandey/markandey.in →
          </a>
        </div>
      </div>
    </div>
  );
}
