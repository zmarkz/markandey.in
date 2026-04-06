import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "/thoughts — Engineering Notes",
  description: "Short-form technical notes. No fluff.",
};

export default function ThoughtsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[900px] mx-auto">
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-white mb-2">
          /THOUGHTS
        </h1>
        <p className="text-zinc-500 font-mono text-sm mb-12">
          Short-form technical notes. No fluff.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-zinc-500 font-mono text-sm">
            No posts yet. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
