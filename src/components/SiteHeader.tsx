"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/navigation";
import type { SiteConfig, SiteSocial } from "@/lib/content";
import clsx from "clsx";

interface SiteHeaderProps {
  config: SiteConfig;
  socials: SiteSocial[];
}

export function SiteHeader({ config, socials }: SiteHeaderProps) {
  const pathname = usePathname();
  const fullName = buildFullName(config);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-0">
        <div className="flex flex-col">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {fullName}
          </Link>
          {config.description ? (
            <p className="max-w-xl text-sm text-slate-600 dark:text-slate-400">{config.description}</p>
          ) : null}
        </div>
        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/"
              ? pathname === item.href
              : pathname?.startsWith(item.href);
            return item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-600 dark:hover:text-sky-400"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-full px-3 py-1 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white",
                  isActive && "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {socials.length > 0 ? (
        <div className="border-t border-slate-200/70 bg-slate-50/60 dark:border-slate-800/80 dark:bg-slate-950/60">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-3 px-4 py-2 text-xs text-slate-600 dark:text-slate-400 lg:px-0">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target={social.url.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-2 py-1 transition-colors hover:bg-white hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {social.icon ? (
                  <span className="inline-flex h-4 w-4 items-center justify-center overflow-hidden">
                    <img src={social.icon} alt="" className="h-4 w-4 object-contain" />
                  </span>
                ) : null}
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function buildFullName(config: SiteConfig): string {
  const parts = [config.first_name, config.middle_name, config.last_name].filter(Boolean) as string[];
  if (parts.length > 0) {
    return parts.join(" ");
  }
  return config.title;
}
