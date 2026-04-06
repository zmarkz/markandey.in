"use client";

import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { CareerCard } from "./CareerCard";
import { StatCounter } from "./StatCounter";

interface JourneySectionProps {
  number: string;
  label: string;
  heading: string;
  body: string;
  cards: {
    company: string;
    role: string;
    description: string;
    tags: string[];
  }[];
  stats?: { label: string; value: string }[];
}

export function JourneySection({
  number,
  label,
  heading,
  body,
  cards,
  stats,
}: JourneySectionProps) {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel number={number} label={label} />

        <Reveal>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl">
            {heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl mb-12">
            {body}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => (
            <CareerCard key={`${card.company}-${card.role}`} {...card} delay={i * 0.1} />
          ))}
        </div>

        {stats && (
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-12 md:gap-16 py-8">
              {stats.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
