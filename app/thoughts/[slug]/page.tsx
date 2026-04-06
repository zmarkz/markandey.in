import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { Badge } from "@/components/shared/Badge";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.meta.title,
    description: post.meta.summary,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[720px] mx-auto">
        <Link
          href="/thoughts"
          className="font-mono text-sm text-zinc-500 hover:text-white transition-colors mb-8 block"
        >
          ← /thoughts
        </Link>

        <header className="mb-10">
          <h1 className="font-mono text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {post.meta.title}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm text-zinc-500">
              {post.meta.date}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-mono prose-headings:font-bold prose-p:text-zinc-300 prose-p:leading-relaxed prose-a:text-indigo-400 prose-code:text-indigo-300 prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-[#30363d]">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
