import Image from "next/image";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { getAboutPage, getNews, getPublications } from "@/lib/content";

interface ResearchItem {
  title: string;
  description?: string;
}

export default async function Home() {
  const about = await getAboutPage();
  const aboutHtml = about?.html ?? "";
  const { title: researchTitle, items: researchItems } = parseResearchSection(
    (about?.data as { research?: unknown })?.research,
  );
  const news = about?.data.announcements?.enabled
    ? await getNews(about.data.announcements.limit ?? 5)
    : [];
  const publications = getPublications();
  const selectedPublications = publications
    .flatMap((group) => group.entries)
    .filter((entry) => entry.selected)
    .slice(0, 5);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 lg:px-0">
      <section className="flex flex-col gap-8 md:flex-row md:items-start">
        {about?.data.profile?.image ? (
          <div
            className={`order-2 flex w-full flex-col items-start gap-4 md:order-${
              about.data.profile.align === "right" ? "2" : "1"
            } md:max-w-xs`}
          >
            <div className="relative w-full max-w-xs overflow-hidden">
              <Image
                src={`/${about.data.profile.image.replace(/^\//, "")}`}
                alt={about.data.title ?? "Profile picture"}
                width={320}
                height={320}
                className={`h-auto w-full object-cover ${
                  about.data.profile.image_circular ? "rounded-full" : "rounded-2xl"
                }`}
              />
            </div>
            {about.data.profile.more_info ? (
              <div
                className="text-sm text-slate-600 dark:text-slate-400"
                dangerouslySetInnerHTML={{ __html: about.data.profile.more_info }}
              />
            ) : null}
          </div>
        ) : null}
        <div className="order-1 flex-1 space-y-4">
          {about?.data.subtitle ? (
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {stripHtml(about.data.subtitle)}
            </p>
          ) : null}
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {about?.data.title ?? "About"}
          </h1>
          {aboutHtml ? <Markdown html={aboutHtml} /> : null}
        </div>
      </section>

      {researchItems.length > 0 ? (
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {researchTitle ?? "Research"}
          </h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchItems.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                {item.description ? (
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <HeaderWithLink title="News" href="/news" />
        {news.length > 0 ? (
          <div
            className={`mt-4 grid gap-4 ${
              about?.data.announcements?.scrollable ? "max-h-80 overflow-y-auto pr-2" : ""
            }`}
          >
            {news.map((item) => (
              <div key={item.slug} className="rounded-xl border border-slate-200 p-4 shadow-sm dark:border-slate-800">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {item.data.date ? item.data.date.toLocaleDateString() : item.year}
                </p>
                <Markdown html={item.html} className="prose-sm" />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">we dont have any news to showcase</p>
        )}
      </section>
      {selectedPublications.length > 0 ? (
        <section>
          <HeaderWithLink title="Selected Publications" href="/publications" />
          <ul className="mt-4 space-y-4">
            {selectedPublications.map((pub) => (
              <li key={pub.id} className="rounded-xl border border-slate-200 p-4 shadow-sm dark:border-slate-800">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{pub.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{pub.authors}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  {pub.year ? <span>{pub.year}</span> : null}
                  {pub.venue ? <span>{pub.venue}</span> : null}
                  {pub.url ? (
                    <a
                      href={normalizeUrl(pub.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-slate-900 px-3 py-1 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                    >
                      View
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function stripHtml(input?: string) {
  if (!input) return "";
  return input.replace(/<[^>]+>/g, "").trim();
}

function normalizeUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

function parseResearchSection(input: unknown): { title?: string; items: ResearchItem[] } {
  if (!input || typeof input !== "object") {
    return { items: [] };
  }

  const title = typeof (input as { title?: unknown }).title === "string" ? (input as { title: string }).title : undefined;
  const rawItems = Array.isArray((input as { items?: unknown }).items) ? (input as { items: unknown[] }).items : [];

  const items = rawItems.reduce<ResearchItem[]>((acc, item) => {
    if (!item || typeof item !== "object") {
      return acc;
    }
    const titleValue = (item as { title?: unknown }).title;
    if (typeof titleValue !== "string" || !titleValue.trim()) {
      return acc;
    }
    const descriptionValue = (item as { description?: unknown }).description;
    acc.push({
      title: titleValue,
      description: typeof descriptionValue === "string" ? descriptionValue : undefined,
    });
    return acc;
  }, []);

  return { title, items };
}

interface HeaderWithLinkProps {
  title: string;
  href: string;
}

function HeaderWithLink({ title, href }: HeaderWithLinkProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{title}</h2>
      <Link
        href={href}
        className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        View all
      </Link>
    </div>
  );
}
