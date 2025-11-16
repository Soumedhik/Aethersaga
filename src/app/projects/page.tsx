import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 lg:px-0">
      <PageHeader
        title="Projects"
        description="Active collaborations, prototypes, and data resources from the AetherSaga AI lab."
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Current Projects</h2>
        <p className="text-base text-slate-600 dark:text-slate-400">
          We are consolidating prototypes and proof-of-concept deployments that reflect our most active collaborations.
          Spotlight summaries return soon as we elevate the work that is ready to share.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Datasets</h2>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-12 text-center text-lg font-medium text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
          Coming soon.
        </div>
      </section>
    </div>
  );
}
