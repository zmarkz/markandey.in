"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { TerminalLine } from "./TerminalLine";
import { TerminalInput } from "./TerminalInput";
import { useTerminalChat } from "./useTerminalChat";
import { isBuiltinCommand, getCommandOutput } from "./commands";

interface Line {
  id: number;
  type: "input" | "output" | "system" | "boot";
  content: string;
}

const BOOT_SEQUENCE = [
  { text: "initializing markandey.in v2.0...", delay: 0 },
  { text: "loading knowledge base... done", delay: 800 },
  { text: "connecting to local AI... online", delay: 1600 },
];

const GREETING = `
Hello. I'm Markandey Singh.
Director of Engineering at MoneyView.
I build systems that scale and AI that thinks.

Type 'help' for commands, or just ask me anything.`;

export function Terminal({ onScrollToVisual }: { onScrollToVisual?: () => void }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const { sendMessage, isStreaming } = useTerminalChat();

  const addLine = useCallback((type: Line["type"], content: string) => {
    const id = ++idRef.current;
    setLines((prev) => [...prev, { id, type, content }]);
    return id;
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(scrollToBottom, [lines, streamingContent, scrollToBottom]);

  // Boot sequence
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    BOOT_SEQUENCE.forEach(({ text, delay }) => {
      timeouts.push(
        setTimeout(() => addLine("boot", text), delay)
      );
    });

    timeouts.push(
      setTimeout(() => {
        addLine("output", GREETING);
        setIsBooting(false);
        setIsReady(true);
      }, 2400)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [addLine]);

  const handleCommand = useCallback(
    (input: string) => {
      addLine("input", input);

      const cmd = input.trim().toLowerCase();

      if (cmd === "clear") {
        setLines([]);
        return;
      }

      if (cmd === "visual") {
        onScrollToVisual?.();
        addLine("system", "Scrolling to visual section...");
        return;
      }

      if (cmd === "lab") {
        addLine("system", "Navigating to /lab...");
        window.location.href = "/lab";
        return;
      }

      if (cmd === "resume") {
        addLine("system", "Opening resume...");
        window.open("/resume.pdf", "_blank");
        return;
      }

      if (isBuiltinCommand(input)) {
        const output = getCommandOutput(input);
        if (output) addLine("output", output);
        return;
      }

      // AI chat
      setStreamingContent("");
      let accumulated = "";

      sendMessage(
        input,
        (token) => {
          accumulated += token;
          setStreamingContent(accumulated);
        },
        () => {
          addLine("output", accumulated);
          setStreamingContent("");
        },
        (error) => {
          addLine("system", error);
          setStreamingContent("");
        }
      );
    },
    [addLine, sendMessage, onScrollToVisual]
  );

  return (
    <div className="w-full max-w-[900px] mx-auto">
      {/* Terminal window */}
      <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
          <span className="font-mono text-xs text-zinc-500">markandey.in</span>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="p-6 max-h-[60vh] overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#3f3f46 #1a1a2e",
          }}
        >
          <div className="space-y-1">
            {lines.map((line) => (
              <TerminalLine
                key={line.id}
                type={line.type}
                content={line.content}
              />
            ))}

            {/* Streaming AI response */}
            {streamingContent && (
              <TerminalLine
                type="output"
                content={streamingContent}
                showCursor
              />
            )}

            {/* Loading indicator */}
            {isStreaming && !streamingContent && (
              <TerminalLine type="system" content="thinking..." />
            )}
          </div>

          {/* Input */}
          {isReady && !isBooting && (
            <div className="mt-3">
              <TerminalInput
                onSubmit={handleCommand}
                disabled={isStreaming}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
