import Link from "next/link";
import { Badge } from "@/components/shared/Badge";
import type { PostMeta } from "@/lib/mdx";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/thoughts/${post.slug}`}>
      <article className="group bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/30">
        <p className="font-mono text-xs text-zinc-500 mb-2">{post.date}</p>
        <h2 className="font-mono text-xl font-medium text-white mb-2 group-hover:text-indigo-400 transition-colors">
          {post.title}
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          {post.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>#{tag}</Badge>
          ))}
        </div>
      </article>
    </Link>
  );
}
