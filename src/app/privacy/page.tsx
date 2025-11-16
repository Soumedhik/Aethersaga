import { PageHeader } from "@/components/PageHeader";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect only the information you voluntarily share with AetherSaga AI, such as contact form submissions or collaboration requests. We do not automatically gather personal data beyond basic analytics used to understand overall site usage.",
  },
  {
    title: "2. How We Use Information",
    content:
      "Any details you provide are used solely to respond to inquiries, coordinate research projects, and improve our academic outreach. We do not sell or rent your personal information.",
  },
  {
    title: "3. Data Retention",
    content:
      "Messages and contact details are retained only for as long as necessary to support ongoing conversations or collaboration, after which they are securely deleted.",
  },
  {
    title: "4. Third-Party Services",
    content:
      "Our site may link to third-party platforms (for example, GitHub or Google Scholar). Their privacy practices apply when you visit their services, so review their policies for more details.",
  },
  {
    title: "5. Contact",
    content:
      "If you have questions about this policy or would like your data removed, email us at privacy@aethersaga.ai.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12 lg:px-0">
      <PageHeader
        title="Privacy Policy"
        description="How AetherSaga AI handles your information when you interact with our site."
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        AetherSaga AI is an academic research collective focused on trustworthy AI systems. We take a minimal
        data approach and only collect information needed to respond to collaborators and maintain this site.
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
