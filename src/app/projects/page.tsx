import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Projects",
};

const PROJECTS = [
  {
    title: "EPIC Mahabharat Entity recongnition",
    description: "Novel Ensemble architectures for named entity recognition in ancient Indian literature",
    image: "/Aethersaga/assets/img/mahabharata.jpg",
  },
  {
    title: "Parkinson Disease Aid Device",
    description: "Sensor-driven analytics that surface early progression patterns and support clinician review.",
    image: "/Aethersaga/assets/img/parkinsons.png",
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 lg:px-0">
      <PageHeader
        title="Projects"
  description="Active collaborations, prototypes, and data resources from the Aethersaga AI lab."
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Featured Projects</h2>
        <p className="text-base text-slate-600 dark:text-slate-400">
          Brief snapshots from the lab highlighting ongoing storytelling and health-tech efforts.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              <div className="space-y-2 px-5 py-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
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
