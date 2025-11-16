import clsx from "clsx";

interface MarkdownProps {
  html: string;
  className?: string;
}

export function Markdown({ html, className }: MarkdownProps) {
  return (
    <article
      className={clsx("prose max-w-none prose-slate dark:prose-invert", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
