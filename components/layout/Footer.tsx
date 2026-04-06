import { SITE } from "@/lib/constants";
import { GitBranch, Link2, ExternalLink, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-8 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Markandey Singh
        </p>
        <div className="flex items-center gap-5">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GitBranch size={18} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Link2 size={18} />
          </a>
          <a
            href={SITE.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Twitter/X"
          >
            <ExternalLink size={18} />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
