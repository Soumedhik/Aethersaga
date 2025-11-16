import { PageHeader } from "@/components/PageHeader";

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12 lg:px-0">
      <PageHeader title="Privacy" description="Placeholder notice – replace with your policy." />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        This project is a static port of the al-folio theme. Update this page with your actual privacy
        policy or remove the link from the footer if it is not required.
      </p>
    </div>
  );
}
