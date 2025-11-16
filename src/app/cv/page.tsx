import { PageHeader } from "@/components/PageHeader";
import { getCvData } from "@/lib/content";

export const metadata = {
  title: "Curriculum Vitae",
};

export default function CvPage() {
  const cv = getCvData();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12 lg:px-0">
      <PageHeader title="Curriculum Vitae" description="A snapshot of professional experience and education." />

      <div className="space-y-10">
        {cv.sections.map((section) => (
          <section key={section.id} className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {section.title}
            </h2>
            <ul className="space-y-4">
              {section.items.map((item, index) => (
                <li key={`${section.id}-${index}`} className="space-y-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                    {item.subtitle ? (
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.subtitle}</p>
                    ) : null}
                    {item.period ? (
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.period}</p>
                    ) : null}
                  </div>
                  {item.description ? (
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  ) : null}
                  {item.links && item.links.length > 0 ? (
                    <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                      {item.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-slate-200 px-3 py-1 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                  {item.items && item.items.length > 0 ? (
                    <ul className="ml-4 space-y-2 border-l border-slate-200 pl-4 dark:border-slate-800">
                      {item.items.map((child, childIndex) => (
                        <li key={`${section.id}-${index}-child-${childIndex}`} className="space-y-1">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{child.title}</p>
                          {child.description ? (
                            <p className="text-sm text-slate-600 dark:text-slate-400">{child.description}</p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
