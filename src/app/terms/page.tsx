import { PageHeader } from "@/components/PageHeader";

export default function TermsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12 lg:px-0">
      <PageHeader title="Terms of Service" description="Placeholder notice – replace with your actual terms." />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        These terms are a starting point for the AetherSaga AI project. Update this page with the legal language
        that applies to your organisation, or remove the link from the footer if you do not plan to collect
        personal data or run production services.
      </p>
    </div>
  );
}
