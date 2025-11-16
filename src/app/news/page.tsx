import { PageHeader } from "@/components/PageHeader";
import { Markdown } from "@/components/Markdown";
import { getNews } from "@/lib/content";

export const metadata = {
  title: "News",
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12 lg:px-0">
      <PageHeader title="News" description="Highlights and announcements." />

      <div className="space-y-4">
        {news.map((item) => (
          <article key={item.slug} className="rounded-xl border border-slate-200 p-4 shadow-sm dark:border-slate-800">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {item.data.date ? item.data.date.toLocaleDateString() : item.year}
            </p>
            <Markdown html={item.html} className="prose-sm" />
          </article>
        ))}
      </div>
    </div>
  );
}
