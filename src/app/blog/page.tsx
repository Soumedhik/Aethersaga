import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Markdown } from "@/components/Markdown";
import { getPosts, getSiteConfig } from "@/lib/content";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const config = getSiteConfig();
  const posts = await getPosts();
  const eyebrow = config.blog_name ? config.blog_name.toUpperCase() : undefined;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-12 lg:px-0">
      <PageHeader
        title={config.blog_name ?? "Blog"}
        description={config.blog_description}
        eyebrow={eyebrow}
      />

      {config.display_tags && config.display_tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-400">
          {config.display_tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
              #{tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-slate-200 p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:hover:border-slate-700"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <span>{post.data.date ? post.data.date.toLocaleDateString() : post.year}</span>
              <span>{Math.max(1, Math.round(post.reading.minutes))} min read</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {post.permalink.startsWith("http") ? (
                <a href={post.permalink} target="_blank" rel="noreferrer" className="hover:underline">
                  {post.data.title}
                </a>
              ) : (
                <Link href={post.permalink} className="hover:underline">
                  {post.data.title}
                </Link>
              )}
            </h2>
            {post.data.description ? (
              <p className="mt-2 text-base text-slate-600 dark:text-slate-400">{post.data.description}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              {post.data.tags?.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
              <Markdown html={post.html} className="prose-sm" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
