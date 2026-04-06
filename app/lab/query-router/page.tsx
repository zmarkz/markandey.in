"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Server } from "lucide-react";
import { classifyQuery, type ClassificationResult } from "@/lib/classifyQuery";
import { motion, AnimatePresence } from "framer-motion";

const EXAMPLES = [
  "Analyze my portfolio and recommend what to sell",
  "What is the total value of my holdings?",
  "Should I rebalance my IT sector allocation?",
  "How many stocks do I own?",
  "Compare risk between my top 5 holdings",
  "Show me sector allocation",
];

export default function QueryRouterPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ClassificationResult | null>(null);

  const handleClassify = (q: string) => {
    setQuery(q);
    setResult(classifyQuery(q));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[900px] mx-auto">
        <Link
          href="/lab"
          className="font-mono text-sm text-zinc-500 hover:text-white transition-colors mb-8 inline-flex items-center gap-2"
        >
          <ArrowLeft size={14} /> Back to Lab
        </Link>

        <h1 className="font-mono text-3xl font-bold text-white mb-2 mt-6">
          Query Router
        </h1>
        <p className="text-zinc-500 text-sm mb-8">
          Type any question about a stock portfolio and see how the AI routing
          system classifies it.
        </p>

        {/* Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && query.trim() && handleClassify(query.trim())
            }
            placeholder="Type any question about a stock portfolio..."
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-5 py-4 font-mono text-sm text-white placeholder:text-zinc-600 outline-none focus:border-indigo-500/50 transition-colors"
          />
          <button
            onClick={() => query.trim() && handleClassify(query.trim())}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-mono text-xs transition-colors"
          >
            Classify
          </button>
        </div>

        {/* Example queries */}
        <div className="flex flex-wrap gap-2 mb-10">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => handleClassify(ex)}
              className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 py-1.5 font-mono text-xs text-zinc-400 hover:text-white hover:border-indigo-500/50 transition-all"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={query}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Flow diagram */}
              <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-8 mb-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                  {/* User Query */}
                  <div className="bg-[#12121a] border border-zinc-700 rounded-xl px-4 py-3 text-center">
                    <p className="font-mono text-xs text-zinc-500 mb-1">
                      Query
                    </p>
                    <p className="font-mono text-sm text-white max-w-[200px] truncate">
                      &quot;{query}&quot;
                    </p>
                  </div>

                  <span className="font-mono text-zinc-600 text-xl">→</span>

                  {/* Classifier */}
                  <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl px-4 py-3 text-center">
                    <p className="font-mono text-xs text-indigo-400 mb-1">
                      Classifier
                    </p>
                    <p className="font-mono text-sm text-white">
                      {(result.confidence * 100).toFixed(0)}% confidence
                    </p>
                  </div>

                  <span className="font-mono text-zinc-600 text-xl">→</span>

                  {/* Route */}
                  <div
                    className={`border rounded-xl px-4 py-3 text-center ${
                      result.type === "COMPLEX"
                        ? "bg-amber-500/10 border-amber-500/30"
                        : "bg-green-500/10 border-green-500/30"
                    }`}
                  >
                    <p
                      className={`font-mono text-xs mb-1 ${
                        result.type === "COMPLEX"
                          ? "text-amber-400"
                          : "text-green-400"
                      }`}
                    >
                      {result.type}
                    </p>
                    <p className="font-mono text-sm text-white flex items-center gap-2">
                      {result.type === "COMPLEX" ? (
                        <Zap size={14} className="text-amber-400" />
                      ) : (
                        <Server size={14} className="text-green-400" />
                      )}
                      {result.model}
                    </p>
                  </div>

                  <span className="font-mono text-zinc-600 text-xl">→</span>

                  {/* Cost */}
                  <div className="bg-[#12121a] border border-zinc-700 rounded-xl px-4 py-3 text-center">
                    <p className="font-mono text-xs text-zinc-500 mb-1">
                      Cost
                    </p>
                    <p className="font-mono text-lg font-bold text-white">
                      {result.cost}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6">
                <h3 className="font-mono text-sm text-zinc-500 mb-3">
                  Routing Decision
                </h3>
                <p className="font-mono text-sm text-zinc-300 mb-4">
                  {result.reason}
                </p>
                {result.matchedKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {result.matchedKeywords.map((kw) => (
                      <span
                        key={kw}
                        className={`font-mono text-xs px-2 py-1 rounded ${
                          result.type === "COMPLEX"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
