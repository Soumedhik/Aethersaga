import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Markdown } from "@/components/Markdown";
import { getBooks } from "@/lib/content";

export const metadata = {
  title: "Books",
};

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12 lg:px-0">
      <PageHeader
        title="Books"
        description="Long-form reads, reviews, and recommendations."
      />

      <div className="space-y-6">
        {books.map((book) => (
          <article
            key={book.slug}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-6 shadow-sm dark:border-slate-800 md:flex-row"
          >
            {book.data.cover ? (
              <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={normalizeCover(book.data.cover)}
                  alt={book.data.title}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
            ) : null}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {book.year ? <span>{book.year}</span> : null}
                {book.data.category ? <span>{book.data.category}</span> : null}
                {book.data.rating ? <span>Rating: {book.data.rating}/5</span> : null}
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{book.data.title}</h2>
              {book.data.description ? (
                <p className="text-sm text-slate-600 dark:text-slate-400">{book.data.description}</p>
              ) : null}
              <Markdown html={book.html} className="prose-sm" />
              {book.data.link ? (
                <a
                  href={normalizeCover(book.data.link)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  View book
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function normalizeCover(value: string): string {
  if (value.startsWith("http")) return value;
  return value.startsWith("/") ? value : `/${value}`;
}
