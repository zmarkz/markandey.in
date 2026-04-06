"use client";

import { Badge } from "@/components/shared/Badge";
import { Reveal } from "@/components/shared/Reveal";

interface CareerCardProps {
  company: string;
  role: string;
  description: string;
  tags: string[];
  delay?: number;
}

export function CareerCard({
  company,
  role,
  description,
  tags,
  delay = 0,
}: CareerCardProps) {
  return (
    <Reveal delay={delay}>
      <div className="group bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/30">
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-1">
          {company}
        </p>
        <h3 className="font-mono text-lg font-medium text-white mb-2">
          {role}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
