"use client";

import { useRef } from "react";
import { Terminal } from "@/components/terminal/Terminal";
import { JourneySection } from "@/components/journey/JourneySection";
import { ConnectSection } from "@/components/journey/ConnectSection";
import { ParticleField } from "@/components/shared/ParticleField";
import { CAREER } from "@/lib/constants";

export default function Home() {
  const visualRef = useRef<HTMLDivElement>(null);

  const scrollToVisual = () => {
    visualRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero — Terminal */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16">
        <ParticleField />
        <div className="relative z-10 w-full">
          <Terminal onScrollToVisual={scrollToVisual} />
        </div>
        <button
          onClick={scrollToVisual}
          className="relative z-10 mt-8 font-mono text-sm text-zinc-600 hover:text-zinc-400 transition-colors animate-bounce"
          aria-label="Scroll to visual section"
        >
          ↓ scroll to explore visually
        </button>
      </section>

      {/* Visual Journey */}
      <div ref={visualRef}>
        {CAREER.map((section) => (
          <JourneySection key={section.number} {...section} />
        ))}
      </div>

      {/* Connect CTA */}
      <ConnectSection />
    </>
  );
}
