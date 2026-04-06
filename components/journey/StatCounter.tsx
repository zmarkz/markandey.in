"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function StatCounter({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center"
    >
      <p className="font-mono text-3xl md:text-4xl font-bold text-white mb-1">
        {value}
      </p>
      <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}
