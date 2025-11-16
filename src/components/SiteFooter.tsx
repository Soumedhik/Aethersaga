import type { SiteConfig } from "@/lib/content";
import Link from "next/link";

interface SiteFooterProps {
  config: SiteConfig;
}

export function SiteFooter({ config }: SiteFooterProps) {
  return (
    <footer className="border-t border-slate-200/70 bg-white/80 py-8 text-sm text-slate-600 dark:border-slate-800/80 dark:bg-slate-950/80 dark:text-slate-400">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 lg:px-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-medium text-slate-900 dark:text-slate-100">
            &copy; {new Date().getFullYear()} {config.title}
          </p>
          <nav className="flex flex-wrap items-center gap-3">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white">
              Terms of Service
            </Link>
          </nav>
        </div>
        {config.footer_text ? (
          <div
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: config.footer_text }}
          />
        ) : null}
      </div>
    </footer>
  );
}
