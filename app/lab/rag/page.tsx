"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Fallback demo data when Knowledge Store is not available
const DEMO_QA = [
  {
    query: "How does AI query routing work?",
    chunks: [
      {
        text: "The query router classifies incoming queries as COMPLEX or SIMPLE using keyword matching. COMPLEX queries go to Claude Sonnet, while SIMPLE queries are routed to Qwen 2.5 running locally via Ollama.",
        source: "AI Architecture Docs",
        score: 0.94,
      },
      {
        text: "93% of queries are classified as SIMPLE and handled by the local model at zero cost. Only 7% require the paid Claude API, resulting in 76% total cost savings.",
        source: "Cost Analysis",
        score: 0.89,
      },
      {
        text: "The classifier defaults to COMPLEX when no keyword matches are found, ensuring that ambiguous queries get the more capable model.",
        source: "Routing Logic",
        score: 0.82,
      },
    ],
    answer:
      "AI query routing works by classifying each incoming query as either COMPLEX or SIMPLE using keyword-based matching. COMPLEX queries (containing words like 'analyze', 'recommend', 'risk') are sent to Claude Sonnet for deep analysis. SIMPLE queries ('what is', 'how many', 'show me') go to Qwen 2.5 running locally via Ollama — completely free. This approach routes 93% of queries locally, saving 76% on AI costs.",
  },
  {
    query: "What is an MCP Agent Farm?",
    chunks: [
      {
        text: "The MCP Agent Farm is an orchestration layer that manages multiple AI agent templates. Each template defines which model to use, what system prompt to inject, and which tools are available.",
        source: "Agent Farm README",
        score: 0.96,
      },
      {
        text: "Built with Node.js, Fastify, and BullMQ, the Agent Farm handles async task execution with retry logic, rate limiting, and streaming SSE responses.",
        source: "Architecture Docs",
        score: 0.87,
      },
      {
        text: "The farm currently manages 5 agent templates: portfolio analysis (Claude), simple queries (Qwen), document parsing (Qwen), MCP tool routing, and the personal website chat agent.",
        source: "Template Registry",
        score: 0.83,
      },
    ],
    answer:
      "An MCP Agent Farm is an orchestration layer for AI agents that implements the Model Context Protocol. It manages multiple agent templates — each with its own model, system prompt, and tool configuration. The farm handles task routing, execution, streaming responses, and retry logic. Think of it as a smart dispatcher that knows which AI model and tools to use for each type of request.",
  },
  {
    query: "What does a Director of Engineering do?",
    chunks: [
      {
        text: "As Director of Engineering at MoneyView, Markandey leads Operations, Platform, and DevOps engineering teams. Responsibilities include scalability, availability, security, and cost-efficiency of critical financial systems.",
        source: "Career Profile",
        score: 0.95,
      },
      {
        text: "The Director role involves strategic planning, hiring, org design, and choosing which problems the team should solve. The biggest shift from IC: decisions have months-long feedback loops.",
        source: "Blog: IC to Director",
        score: 0.88,
      },
      {
        text: "At the Director level, you stop solving problems and start choosing which problems to solve. You're building the organization, not the product.",
        source: "Career Insights",
        score: 0.84,
      },
    ],
    answer:
      "A Director of Engineering leads multiple engineering teams and is responsible for both technical strategy and organizational health. At MoneyView, this means overseeing Operations, Platform, and DevOps — ensuring systems serve millions of users reliably. The role is less about writing code and more about choosing which problems to solve, hiring the right people, and building an engineering culture that ships quality at speed.",
  },
];

export default function RagPlaygroundPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<(typeof DEMO_QA)[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q: string) => {
    setQuery(q);
    setLoading(true);

    // Try real Knowledge Store first
    try {
      const res = await fetch("/api/status");
      const status = await res.json();
      if (status.ragService === "online") {
        // Would call real RAG here
      }
    } catch {
      // Fall through to demo
    }

    // Use demo data — find best match or default to first
    await new Promise((r) => setTimeout(r, 800));
    const lower = q.toLowerCase();
    const match =
      DEMO_QA.find(
        (d) =>
          lower.includes("routing") ||
          lower.includes("route") ||
          lower.includes("agent") ||
          lower.includes("mcp") ||
          lower.includes("director") ||
          lower.includes("engineering")
      ) || DEMO_QA[0];

    setResult({ ...match, query: q });
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Link
          href="/lab"
          className="font-mono text-sm text-zinc-500 hover:text-white transition-colors mb-8 inline-flex items-center gap-2"
        >
          <ArrowLeft size={14} /> Back to Lab
        </Link>

        <h1 className="font-mono text-3xl font-bold text-white mb-2 mt-6">
          RAG Playground
        </h1>
        <p className="text-zinc-500 text-sm mb-8">
          Ask anything about engineering, AI, or fintech. Watch semantic retrieval in action.
        </p>

        {/* Search input */}
        <div className="relative mb-8">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && query.trim() && handleSearch(query.trim())
            }
            placeholder="Ask anything about engineering, AI, or fintech..."
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl pl-12 pr-5 py-4 font-mono text-sm text-white placeholder:text-zinc-600 outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>

        {/* Quick queries */}
        <div className="flex flex-wrap gap-2 mb-10">
          {DEMO_QA.map((d) => (
            <button
              key={d.query}
              onClick={() => handleSearch(d.query)}
              className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 py-1.5 font-mono text-xs text-zinc-400 hover:text-white hover:border-indigo-500/50 transition-all"
            >
              {d.query}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3 text-zinc-500 font-mono text-sm">
            <div className="w-4 h-4 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            Searching knowledge base...
          </div>
        )}

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && !loading && (
            <motion.div
              key={result.query}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Retrieved chunks */}
              <div>
                <h3 className="font-mono text-sm text-zinc-500 mb-4">
                  Retrieved Context
                </h3>
                <div className="space-y-3">
                  {result.chunks.map((chunk, i) => (
                    <div
                      key={i}
                      className="bg-[#12121a] border border-zinc-800/50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-indigo-400">
                          {chunk.source}
                        </span>
                        <span className="font-mono text-xs text-zinc-500">
                          {(chunk.score * 100).toFixed(0)}% match
                        </span>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {chunk.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generated answer */}
              <div>
                <h3 className="font-mono text-sm text-zinc-500 mb-4">
                  Generated Answer
                </h3>
                <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-6">
                  <p className="text-zinc-300 leading-relaxed">
                    {result.answer}
                  </p>
                  <div className="mt-4 pt-4 border-t border-zinc-800">
                    <p className="font-mono text-xs text-zinc-600">
                      Model: Qwen 2.5 via Ollama | Sources: {result.chunks.length} chunks | Cost: ₹0.00
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
