"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { motion } from "framer-motion";

interface FlowStep {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  log: string;
}

const SAMPLE_FLOWS: { query: string; steps: FlowStep[] }[] = [
  {
    query: "Analyze my portfolio and suggest what to sell",
    steps: [
      {
        id: "user",
        label: "User",
        sublabel: "Query received",
        color: "border-zinc-500",
        log: '[REQUEST] POST /api/tasks/stream | consumer=portfolio-tracker',
      },
      {
        id: "gateway",
        label: "Gateway",
        sublabel: "Auth + routing",
        color: "border-indigo-500",
        log: '[ROUTING] query="Analyze my portfolio" → COMPLEX → Claude (template 3) | portfolio=1',
      },
      {
        id: "classifier",
        label: "Classifier",
        sublabel: "COMPLEX (95%)",
        color: "border-amber-500",
        log: '[CLASSIFY] Keywords matched: "analyze", "sell" → COMPLEX | confidence=0.95',
      },
      {
        id: "agent",
        label: "Claude Sonnet",
        sublabel: "Template 3",
        color: "border-purple-500",
        log: '[AGENT] Template 3 (Portfolio Analyst) | model=claude-sonnet-4-6 | maxTokens=4096',
      },
      {
        id: "tools",
        label: "Tool Calls",
        sublabel: "get_holdings()",
        color: "border-cyan-500",
        log: '[TOOL] Calling: get_holdings() → 29 holdings loaded | 142ms',
      },
      {
        id: "response",
        label: "Response",
        sublabel: "JSON Structured",
        color: "border-green-500",
        log: '[RESULT] COMPLEX → Claude | 2847ms | 3957chars | ~₹0.05 | JSON_STRUCTURED',
      },
    ],
  },
  {
    query: "How many stocks do I own?",
    steps: [
      {
        id: "user",
        label: "User",
        sublabel: "Query received",
        color: "border-zinc-500",
        log: '[REQUEST] POST /api/tasks/stream | consumer=portfolio-tracker',
      },
      {
        id: "gateway",
        label: "Gateway",
        sublabel: "Auth + routing",
        color: "border-indigo-500",
        log: '[ROUTING] query="How many stocks?" → SIMPLE → Qwen local (template 4)',
      },
      {
        id: "classifier",
        label: "Classifier",
        sublabel: "SIMPLE (90%)",
        color: "border-green-500",
        log: '[CLASSIFY] Keywords matched: "how many" → SIMPLE | confidence=0.90',
      },
      {
        id: "agent",
        label: "Qwen 2.5",
        sublabel: "Template 4 (Local)",
        color: "border-emerald-500",
        log: '[AGENT] Template 4 (Local Analyst) | model=qwen2.5-coder:14b | via Ollama',
      },
      {
        id: "response",
        label: "Response",
        sublabel: "Streaming MD",
        color: "border-green-500",
        log: '[RESULT] SIMPLE → Qwen local | STREAMING_MARKDOWN | 890ms | cost=₹0.00',
      },
    ],
  },
];

export default function AgentFlowPage() {
  const [activeFlow, setActiveFlow] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);

  const runFlow = useCallback((flowIndex: number) => {
    const flow = SAMPLE_FLOWS[flowIndex];
    setActiveFlow(flowIndex);
    setActiveStep(-1);
    setLogs([]);

    flow.steps.forEach((step, i) => {
      setTimeout(() => {
        setActiveStep(i);
        setLogs((prev) => [...prev, step.log]);
      }, (i + 1) * 700);
    });
  }, []);

  const flow = activeFlow !== null ? SAMPLE_FLOWS[activeFlow] : null;

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
          Agent Flow Visualizer
        </h1>
        <p className="text-zinc-500 text-sm mb-8">
          Watch queries flow through the AI agent orchestration pipeline.
        </p>

        {/* Sample queries */}
        <div className="flex flex-wrap gap-3 mb-10">
          {SAMPLE_FLOWS.map((flow, i) => (
            <button
              key={i}
              onClick={() => runFlow(i)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-mono text-sm transition-colors"
            >
              <Play size={14} />
              &quot;{flow.query}&quot;
            </button>
          ))}
        </div>

        {flow && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Flow nodes */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3">
                {flow.steps.map((step, i) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <motion.div
                      initial={{ opacity: 0.3, scale: 0.9 }}
                      animate={{
                        opacity: i <= activeStep ? 1 : 0.3,
                        scale: i <= activeStep ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`border-2 ${
                        i <= activeStep ? step.color : "border-zinc-800"
                      } rounded-xl px-4 py-3 bg-[#12121a] text-center min-w-[120px]`}
                    >
                      <p className="font-mono text-sm text-white">
                        {step.label}
                      </p>
                      <p className="font-mono text-xs text-zinc-500 mt-0.5">
                        {step.sublabel}
                      </p>
                    </motion.div>
                    {i < flow.steps.length - 1 && (
                      <motion.span
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: i < activeStep ? 1 : 0.2 }}
                        className="font-mono text-zinc-600 text-lg"
                      >
                        →
                      </motion.span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Logs panel */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 max-h-[400px] overflow-y-auto">
              <p className="font-mono text-xs text-zinc-500 mb-3">
                Live Logs
              </p>
              <div className="space-y-2">
                {logs.map((log, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-mono text-xs text-zinc-400 leading-relaxed"
                  >
                    {log}
                  </motion.p>
                ))}
                {logs.length === 0 && (
                  <p className="font-mono text-xs text-zinc-600">
                    Click a query to see logs...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
