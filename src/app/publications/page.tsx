import { PageHeader } from "@/components/PageHeader";
import { getPublications } from "@/lib/content";

export const metadata = {
  title: "Publications",
};

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12 lg:px-0">
      <PageHeader
        title="Publications"
        description="Selected research outputs and peer-reviewed work."
      />

      <div className="space-y-8">
        {publications.map((group) => (
          <section key={group.year} className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{group.year}</h2>
            <ol className="space-y-4">
              {group.entries.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-xl border border-slate-200 p-4 shadow-sm dark:border-slate-800"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {entry.title}
                    </h3>
                    {entry.selected ? (
                      <span className="rounded-full bg-slate-900 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white dark:bg-slate-100 dark:text-slate-900">
                        Selected
                      </span>
                    ) : null}
                  </div>
                  {entry.authors ? (
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{entry.authors}</p>
                  ) : null}
                  {entry.venue ? (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">{entry.venue}</p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
                    {entry.url ? (
                      <a
                        href={normalizeLink(entry.url)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-slate-900 px-3 py-1 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                      >
                        View
                      </a>
                    ) : null}
                    {entry.pdf ? (
                      <a
                        href={normalizeLink(entry.pdf)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        PDF
                      </a>
                    ) : null}
                    {entry.html ? (
                      <a
                        href={normalizeLink(entry.html)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        HTML
                      </a>
                    ) : null}
                  </div>
                  {entry.extra?.abstract ? (
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                      {String(entry.extra.abstract)}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

function normalizeLink(link: string): string {
  if (link.startsWith("http")) return link;
  return link.startsWith("/") ? link : `/${link}`;
}
