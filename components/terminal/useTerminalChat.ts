"use client";

import { useState, useCallback } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function useTerminalChat() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);

  const sendMessage = useCallback(
    async (
      message: string,
      onToken: (token: string) => void,
      onDone: () => void,
      onError: (error: string) => void
    ) => {
      setIsStreaming(true);
      const newHistory = [...history, { role: "user" as const, content: message }];

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            history: newHistory.slice(-10),
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.token) {
                  fullResponse += parsed.token;
                  onToken(parsed.token);
                } else if (parsed.error) {
                  onError(parsed.error);
                }
              } catch {
                // Not JSON, treat as raw token
                fullResponse += data;
                onToken(data);
              }
            }
          }
        }

        setHistory([
          ...newHistory,
          { role: "assistant", content: fullResponse },
        ]);
        onDone();
      } catch {
        onError(
          "AI is offline right now. But I can still help — try these:\n\n  about     → Who I am\n  career    → My journey so far\n  skills    → What I work with\n  projects  → Things I've built\n  contact   → Get in touch\n  lab       → Interactive AI demos"
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [history]
  );

  return { sendMessage, isStreaming };
}
