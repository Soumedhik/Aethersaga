import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Markdown } from "@/components/Markdown";
import { getPostBySlug, getPosts } from "@/lib/content";

interface BlogPostPageParams {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug.replace(/^\d{4}-\d{2}-\d{2}-/, "") }));
}

export async function generateMetadata({ params }: BlogPostPageParams): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.data.title,
    description: post.data.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageParams) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const dateLabel = post.data.date ? post.data.date.toLocaleDateString() : post.year;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12 lg:px-0">
      <PageHeader
        title={post.data.title ?? "Blog post"}
        description={post.data.description}
        eyebrow={dateLabel}
      />

      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        {post.data.tags?.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
            #{tag}
          </span>
        ))}
        {post.data.categories?.map((category) => (
          <span key={category} className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
            {category}
          </span>
        ))}
        <span>{Math.max(1, Math.round(post.reading.minutes))} min read</span>
      </div>

      <Markdown html={post.html} />

      <div className="flex justify-between border-t border-slate-200 pt-6 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
        <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white">
          ← Back to blog
        </Link>
        {post.permalink.startsWith("http") ? (
          <a href={post.permalink} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white">
            View original
          </a>
        ) : null}
      </div>
    </div>
  );
}
