import { PageHeader } from "@/components/PageHeader";
import { getRepositories } from "@/lib/content";

export const metadata = {
  title: "Repositories",
};

export default function RepositoriesPage() {
  const config = getRepositories();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12 lg:px-0">
      <PageHeader title="Repositories" description="GitHub profiles and projects of interest." />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Maintainers</h2>
        {config.github_users && config.github_users.length > 0 ? (
          <ul className="flex flex-wrap gap-3 text-sm">
            {config.github_users.map((user) => (
              <li key={user}>
                <a
                  href={`https://github.com/${user}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                >
                  @{user}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-400">No GitHub users configured.</p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Repositories</h2>
        {config.github_repos && config.github_repos.length > 0 ? (
          <ul className="grid gap-3 md:grid-cols-2">
            {config.github_repos.map((repo) => (
              <li key={repo}>
                <a
                  href={`https://github.com/${repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full flex-col justify-between gap-3 rounded-2xl border border-slate-200 p-4 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                >
                  <span className="text-base font-semibold">{repo}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Open on GitHub</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-400">No repositories listed.</p>
        )}
      </section>
    </div>
  );
}
