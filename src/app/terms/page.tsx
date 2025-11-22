import { PageHeader } from "@/components/PageHeader";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
  "By accessing the Aethersaga AI website you agree to these Terms of Service. If you do not agree, please refrain from using the site.",
  },
  {
    title: "2. Research Content",
    content:
      "All publications, datasets, and project descriptions are provided for academic and informational purposes. They should not be relied on as production-ready systems without additional validation.",
  },
  {
    title: "3. Use of Materials",
    content:
      "You may share or reference our public materials with attribution. Republishing substantial portions without permission is prohibited.",
  },
  {
    title: "4. No Warranty",
    content:
      "The site and its content are provided \"as is\" without any warranties. We disclaim liability for any damages arising from use of the information provided here.",
  },
  {
    title: "5. Contact",
    content:
      "For questions about these terms or to request additional permissions, contact aethersaga.ai@gmail.com.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12 lg:px-0">
      <PageHeader
  title="Terms of Service"
  description="The baseline rules for using the Aethersaga AI website and its research content."
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">
  These terms provide a simple overview of how we expect the site to be used. For formal legal agreements,
  coordinate directly with the Aethersaga AI team.
      </p>
      <div className="space-y-6">
        {sections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{section.title}</h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
