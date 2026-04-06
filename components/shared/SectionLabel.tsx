"use client";

import { motion } from "framer-motion";

export function SectionLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="relative mb-8">
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute -top-16 -left-4 text-[120px] font-bold font-mono text-white select-none pointer-events-none"
      >
        {number}
      </motion.span>
      <span className="relative font-mono text-sm uppercase tracking-[0.15em] text-zinc-500">
        {number} — {label}
      </span>
    </div>
  );
}
