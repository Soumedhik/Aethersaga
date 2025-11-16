import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Markdown } from "@/components/Markdown";
import { getPageBySlug } from "@/lib/content";

export default async function TeachingPage() {
  const page = await getPageBySlug("teaching");
  if (!page) {
    notFound();
  }

  return (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12 lg:px-0">
      <PageHeader title={page.data.title ?? "Teaching"} description={page.data.description} />
      <Markdown html={page.html} />
    </div>
  );
}
