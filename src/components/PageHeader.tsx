import clsx from "clsx";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  eyebrow?: string;
}

export function PageHeader({ title, description, className, eyebrow }: PageHeaderProps) {
  return (
    <header className={clsx("space-y-2", className)}>
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{eyebrow}</p>
      ) : null}
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
      {description ? (
        <p className="max-w-3xl text-base text-slate-600 dark:text-slate-400">{description}</p>
      ) : null}
    </header>
  );
}
