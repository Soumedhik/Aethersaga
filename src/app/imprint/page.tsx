import { PageHeader } from "@/components/PageHeader";

export default function ImprintPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12 lg:px-0">
      <PageHeader title="Imprint" description="Placeholder notice – adapt to your jurisdiction." />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Provide organisation details, contact information, and any legal statements that your region requires
        for an imprint (Impressum). If you do not need this page, remove its link from the footer.
      </p>
    </div>
  );
}
