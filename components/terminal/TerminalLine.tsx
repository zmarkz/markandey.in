"use client";

interface TerminalLineProps {
  type: "input" | "output" | "system" | "boot";
  content: string;
  showCursor?: boolean;
}

export function TerminalLine({ type, content, showCursor }: TerminalLineProps) {
  const styles = {
    input: "text-[#7ee787]",
    output: "text-[#e4e4e7]",
    system: "text-[#f59e0b]",
    boot: "text-[#f59e0b]",
  };

  return (
    <div className={`font-mono text-sm leading-relaxed ${styles[type]} whitespace-pre-wrap break-words`}>
      {type === "input" && <span className="text-[#79c0ff] mr-2">&gt;</span>}
      {type === "boot" && <span className="mr-1">$</span>}
      {content}
      {showCursor && (
        <span className="inline-block w-2 h-4 bg-[#7ee787] ml-0.5 animate-pulse align-middle" />
      )}
    </div>
  );
}
