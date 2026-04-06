"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface TerminalInputProps {
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export function TerminalInput({ onSubmit, disabled }: TerminalInputProps) {
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [disabled]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim() && !disabled) {
      setCommandHistory((prev) => [value.trim(), ...prev]);
      onSubmit(value.trim());
      setValue("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setValue(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setValue(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setValue("");
      }
    }
  };

  return (
    <div className="flex items-center font-mono text-sm" onClick={() => inputRef.current?.focus()}>
      <span className="text-[#79c0ff] mr-2 shrink-0">&gt;</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 bg-transparent text-[#7ee787] outline-none caret-[#7ee787] placeholder:text-zinc-600"
        placeholder={disabled ? "thinking..." : "type a command or ask me anything..."}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
