"use client";

import { Reveal } from "@/components/shared/Reveal";
import { SITE } from "@/lib/constants";
import { GitBranch, Link2, ExternalLink, Mail } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Link2,
    label: "LinkedIn",
    value: "linkedin.com/in/zmarkz",
    href: SITE.linkedin,
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/markandey",
    href: SITE.github,
  },
  {
    icon: ExternalLink,
    label: "Twitter/X",
    value: "@markandey",
    href: SITE.twitter,
  },
];

export function ConnectSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        <Reveal>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s build something together
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-12">
            I&apos;m always interested in conversations about engineering
            leadership, AI systems, and ambitious technical challenges.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {links.map(({ icon: Icon, label, value, href }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/30"
              >
                <Icon
                  size={24}
                  className="text-zinc-500 group-hover:text-indigo-400 transition-colors"
                />
                <span className="font-mono text-sm text-zinc-500">
                  {label}
                </span>
                <span className="font-mono text-sm text-white">{value}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
