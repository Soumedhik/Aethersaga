import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Join Aethersaga AI",
  description: "Be part of cutting-edge research that shapes the future of artificial intelligence and machine learning.",
};

const APPLICATION_STEPS = [
  {
    title: "Submit Application",
    description: "Send your CV, research statement, and relevant documents to our recruitment team.",
  },
  {
    title: "Initial Review",
    description: "Our faculty review applications and shortlist candidates based on qualifications and fit.",
  },
  {
    title: "Interview Process",
    description: "Selected candidates participate in technical interviews and research discussions.",
  },
  {
    title: "Final Decision",
    description: "Successful candidates receive offers and begin their journey with us.",
  },
];

const BENEFITS = [
  {
    title: "World-Class Research",
    description: "Work alongside leading researchers on cutting-edge projects with global impact.",
  },
  {
    title: "Collaborative Environment",
    description: "Open, supportive culture that encourages innovation and cross-disciplinary collaboration.",
  },
  {
    title: "Growth Opportunities",
    description: "Professional development, conference attendance, and career advancement support.",
  },
];

export default function JoinPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-12 lg:px-0">
      <PageHeader
        title="Join Aethersaga AI"
        description="Be part of cutting-edge research that shapes the future of artificial intelligence and machine learning."
      />

      <section className="grid gap-6 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            We are scouting bold thinkers, builders, and researchers who care about trustworthy AI. Whether you&apos;re
            interested in designing neuro-symbolic systems, stress testing agents, or bringing responsible AI into
            production workflows, there&apos;s room to grow with us.
          </p>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Applications are reviewed on a rolling basis. Early submissions receive priority so we can match your
            interests with ongoing initiatives.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Ready to Apply?</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Send your application materials to our recruitment team. Include a CV, research statement, and any project
            highlights that showcase your fit.
          </p>
          <a
            href="mailto:aethersaga.ai@gmail.com"
            className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
          >
            Email us
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Application Process</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {APPLICATION_STEPS.map((step, index) => (
            <div
              key={step.title}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700"
            >
              <span className="absolute -top-8 right-4 text-6xl font-bold text-slate-200/70 dark:text-slate-700/40">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Why Join Aethersaga AI?</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm leading-relaxed text-slate-600 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:border-slate-700"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{benefit.title}</h3>
              <p className="mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
