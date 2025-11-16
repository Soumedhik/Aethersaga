import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import readingTime from "reading-time";
import { format } from "date-fns";
import { renderMarkdown } from "./markdown";
import type { ReadTimeResults } from "reading-time";
import * as bibtexParse from "bibtex-parse-js";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface MarkdownEntry<T = Record<string, unknown>> {
  slug: string;
  data: T & { date?: Date | null };
  content: string;
}

export interface PostFrontMatter {
  title: string;
  description?: string;
  date?: Date | null;
  tags?: string[] | string;
  categories?: string[] | string;
  thumbnail?: string;
  redirect?: string;
  external_source?: string;
  featured?: boolean;
}

export interface NormalizedPostFrontMatter extends Omit<PostFrontMatter, "tags" | "categories"> {
  tags: string[];
  categories: string[];
}

export interface Post extends MarkdownEntry<NormalizedPostFrontMatter> {
  html: string;
  reading: ReadTimeResults;
  year: string;
  permalink: string;
}

export interface NewsFrontMatter {
  title?: string;
  date?: Date | null;
  inline?: boolean;
  related_posts?: boolean;
}

export interface NewsItem extends MarkdownEntry<NewsFrontMatter> {
  html: string;
  year: string;
}

export interface ProjectFrontMatter {
  title: string;
  description?: string;
  img?: string;
  importance?: number;
  category?: string;
  related_publications?: boolean;
  repo?: string;
  link?: string;
}

export interface Project extends MarkdownEntry<ProjectFrontMatter> {
  html: string;
}

export interface BookFrontMatter {
  title: string;
  date?: Date | null;
  description?: string;
  tags?: string[];
  category?: string;
  rating?: number;
  cover?: string;
  link?: string;
}

export interface Book extends MarkdownEntry<BookFrontMatter> {
  html: string;
  year: string | null;
}

export interface AboutFrontMatter {
  title?: string;
  subtitle?: string;
  description?: string;
  profile?: {
    align?: "left" | "right";
    image?: string;
    image_circular?: boolean;
    buttons?: Array<{ text: string; url: string }>;
    more_info?: string;
  };
  selected_papers?: boolean;
  social?: boolean;
  announcements?: {
    enabled?: boolean;
    scrollable?: boolean;
    limit?: number;
  };
  latest_posts?: {
    enabled?: boolean;
    scrollable?: boolean;
    limit?: number;
  };
  research?: {
    title?: string;
    items?: Array<{
      title?: string;
      description?: string;
    }>;
  };
}

export interface AboutPage extends MarkdownEntry<AboutFrontMatter> {
  html: string;
}

export interface CvSectionItem {
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
  items?: CvSectionItem[];
  links?: Array<{ label: string; url: string }>;
}

export interface CvSection {
  id: string;
  title: string;
  items: CvSectionItem[];
}

export interface CvData {
  basics?: Record<string, unknown>;
  sections: CvSection[];
}

export interface SiteSocial {
  id: string;
  label: string;
  url: string;
  icon?: string;
}

export interface SiteConfig {
  title: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  description?: string;
  footer_text?: string;
  lang?: string;
  keywords?: string[];
  icon?: string;
  blog_name?: string;
  blog_description?: string;
  display_tags?: string[];
  display_categories?: string[];
  enable_math?: boolean;
}

export interface PublicationEntry {
  id: string;
  title: string;
  authors?: string;
  year?: string;
  type: string;
  venue?: string;
  url?: string;
  pdf?: string;
  html?: string;
  selected?: boolean;
  extra?: Record<string, unknown>;
}

export interface PublicationsByYear {
  year: string;
  entries: PublicationEntry[];
}

function isDirectory(absolutePath: string): boolean {
  try {
    return fs.statSync(absolutePath).isDirectory();
  } catch {
    return false;
  }
}

function readFile(absolutePath: string): string {
  return fs.readFileSync(absolutePath, "utf-8");
}

function parseDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = new Date(trimmed);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return null;
}

function normalizeStringList(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => normalizeStringList(item))
      .filter((item, index, array) => array.indexOf(item) === index);
  }
  if (typeof value === "string") {
    return value
      .split(/[\s,;]+/)
      .map((part) => part.trim())
      .filter(Boolean);
  }
  if (typeof value === "object" && value) {
    return Object.values(value)
      .map((item) => normalizeStringList(item))
      .flat();
  }
  return [];
}

function buildSlug(filename: string): string {
  return filename.replace(/\\.mdx?$/, "").replace(/\\.markdown$/, "");
}

async function toMarkdownEntry<T>(
  collection: string,
  file: string,
): Promise<MarkdownEntry<T>> {
  const absolutePath = path.join(CONTENT_ROOT, collection, file);
  const raw = readFile(absolutePath);
  const parsed = matter(raw);
  const data = { ...parsed.data } as T & { date?: Date | null };

  if ("date" in parsed.data) {
    (data as { date?: Date | null }).date = parseDate(parsed.data.date);
  }

  return {
    slug: buildSlug(file),
    data,
    content: parsed.content.trim(),
  };
}

function stripWrapping(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length <= 1) return trimmed;
  const first = trimmed[0];
  const last = trimmed[trimmed.length - 1];
  if ((first === "{" && last === "}") || (first === '"' && last === '"')) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function extractBibtexStrings(input: string): { content: string; macros: Map<string, string> } {
  const macros = new Map<string, string>();
  let result = "";
  let index = 0;

  while (index < input.length) {
    const slice = input.slice(index);
    if (slice.toLowerCase().startsWith("@string")) {
      const directiveStart = index;
      index += "@string".length;

      while (index < input.length && /\s/.test(input[index])) {
        index++;
      }

      if (index >= input.length) break;

      const opener = input[index];
      if (opener !== "{" && opener !== "(") {
        // Malformed directive, treat as plain text.
        result += input[directiveStart];
        index = directiveStart + 1;
        continue;
      }

      const closer = opener === "{" ? "}" : ")";
      index += 1; // Skip opener
      let depth = 1;
      const bodyStart = index;

      while (index < input.length && depth > 0) {
        const char = input[index];
        if (char === opener) {
          depth += 1;
        } else if (char === closer) {
          depth -= 1;
        }
        index += 1;
      }

      const bodyEnd = depth === 0 ? index - 1 : input.length;
      const body = input.slice(bodyStart, bodyEnd);

      const equalsIndex = body.indexOf("=");
      if (equalsIndex !== -1) {
        const key = body.slice(0, equalsIndex).trim().toLowerCase();
        const valueRaw = body.slice(equalsIndex + 1).trim();
        if (key) {
          const cleanedValue = stripWrapping(valueRaw);
          if (cleanedValue) {
            macros.set(key, cleanedValue);
          }
        }
      }

      continue;
    }

    result += input[index];
    index += 1;
  }

  return { content: result, macros };
}

function applyBibtexMacros(input: string, macros: Map<string, string>): string {
  if (macros.size === 0) return input;
  return input.replace(/=\s*([A-Za-z][\w:-]*)/g, (match, key: string) => {
    const macro = macros.get(key.toLowerCase());
    if (!macro) return match;
    return `= {${macro}}`;
  });
}

function getMarkdownFiles(collection: string): string[] {
  const directory = path.join(CONTENT_ROOT, collection);
  if (!isDirectory(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".markdown"));
}

export async function getAboutPage(): Promise<AboutPage | null> {
  const files = getMarkdownFiles("pages");
  const aboutFile =
    files.find((file) => buildSlug(file) === "about") ?? files.find((file) => file.startsWith("about."));
  if (!aboutFile) return null;
  const entry = await toMarkdownEntry<AboutFrontMatter>("pages", aboutFile);
  const html = await renderMarkdown(entry.content);
  return { ...entry, html };
}

export async function getPageBySlug(slug: string): Promise<AboutPage | null> {
  const file = getMarkdownFiles("pages").find((item) => buildSlug(item) === slug);
  if (!file) return null;
  const entry = await toMarkdownEntry<AboutFrontMatter>("pages", file);
  const html = await renderMarkdown(entry.content);
  return { ...entry, html };
}

export async function getSupplementaryPageContent(filename: string): Promise<string | null> {
  const files = getMarkdownFiles("pages");
  const matched = files.find((file) => file === filename || buildSlug(file) === filename);
  if (!matched) return null;
  const entry = await toMarkdownEntry<Record<string, unknown>>("pages", matched);
  return renderMarkdown(entry.content);
}

export async function getPosts(): Promise<Post[]> {
  const files = getMarkdownFiles("posts");
  const entries = await Promise.all(
    files.map(async (file) => {
      const entry = await toMarkdownEntry<PostFrontMatter>("posts", file);
      const html = await renderMarkdown(entry.content);
      const reading = readingTime(entry.content);
      const date = entry.data.date ?? parseDate(entry.slug.slice(0, 10));
      const year = date ? format(date, "yyyy") : "";
      const slugWithoutDate = entry.slug.replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const permalink = entry.data.redirect
        ? String(entry.data.redirect)
        : `/blog/${slugWithoutDate}`;
      const tags = normalizeStringList(entry.data.tags);
      const categories = normalizeStringList(entry.data.categories);
      return {
        ...entry,
        data: { ...entry.data, date, tags, categories } as NormalizedPostFrontMatter,
        html,
        reading,
        year,
        permalink,
      };
    }),
  );

  return entries.sort((a, b) => {
    const timeA = a.data.date?.getTime() ?? 0;
    const timeB = b.data.date?.getTime() ?? 0;
    return timeB - timeA;
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const files = getMarkdownFiles("posts");
  const filename = files.find((file) => buildSlug(file).endsWith(slug));
  if (!filename) return null;
  const entry = await toMarkdownEntry<PostFrontMatter>("posts", filename);
  const html = await renderMarkdown(entry.content);
  const reading = readingTime(entry.content);
  const date = entry.data.date ?? parseDate(entry.slug.slice(0, 10));
  const year = date ? format(date, "yyyy") : "";
  const permalink = entry.data.redirect ? String(entry.data.redirect) : `/blog/${slug}`;
  const tags = normalizeStringList(entry.data.tags);
  const categories = normalizeStringList(entry.data.categories);
  return {
    ...entry,
    data: { ...entry.data, date, tags, categories } as NormalizedPostFrontMatter,
    html,
    reading,
    year,
    permalink,
  };
}

export async function getNews(limit?: number): Promise<NewsItem[]> {
  const files = getMarkdownFiles("news");
  const entries = await Promise.all(
    files.map(async (file) => {
      const entry = await toMarkdownEntry<NewsFrontMatter>("news", file);
      const html = await renderMarkdown(entry.content);
      const date = entry.data.date ?? parseDate(entry.slug.slice(0, 10));
      const year = date ? format(date, "yyyy") : "";
      return { ...entry, data: { ...entry.data, date }, html, year };
    }),
  );

  const sorted = entries.sort((a, b) => {
    const timeA = a.data.date?.getTime() ?? 0;
    const timeB = b.data.date?.getTime() ?? 0;
    return timeB - timeA;
  });

  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export async function getProjects(): Promise<Project[]> {
  const files = getMarkdownFiles("projects");
  const entries = await Promise.all(
    files.map(async (file) => {
      const entry = await toMarkdownEntry<ProjectFrontMatter>("projects", file);
      const html = await renderMarkdown(entry.content);
      return { ...entry, html };
    }),
  );

  return entries.sort((a, b) => {
    const scoreA = a.data.importance ?? 0;
    const scoreB = b.data.importance ?? 0;
    return scoreA - scoreB;
  });
}

export async function getBooks(): Promise<Book[]> {
  const files = getMarkdownFiles("books");
  const entries = await Promise.all(
    files.map(async (file) => {
      const entry = await toMarkdownEntry<BookFrontMatter>("books", file);
      const html = await renderMarkdown(entry.content);
      const date = entry.data.date ?? parseDate(entry.slug.slice(0, 4));
      const year = date ? format(date, "yyyy") : null;
      return { ...entry, data: { ...entry.data, date }, html, year };
    }),
  );

  return entries.sort((a, b) => {
    const timeA = a.data.date?.getTime() ?? 0;
    const timeB = b.data.date?.getTime() ?? 0;
    return timeB - timeA;
  });
}

export function getSiteConfig(): SiteConfig {
  const configPath = path.join(CONTENT_ROOT, "config.yml");
  const raw = readFile(configPath);
  const data = (yaml.load(raw) ?? {}) as Record<string, unknown>;
  const keywords = Array.isArray(data.keywords)
    ? data.keywords.map((item) => String(item))
    : typeof data.keywords === "string"
      ? String(data.keywords)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  return {
    title: String(data.title ?? "al-folio"),
    first_name: data.first_name ? String(data.first_name) : undefined,
    middle_name: data.middle_name ? String(data.middle_name) : undefined,
    last_name: data.last_name ? String(data.last_name) : undefined,
    description: data.description ? String(data.description) : undefined,
    footer_text: data.footer_text ? String(data.footer_text) : undefined,
    lang: data.lang ? String(data.lang) : "en",
    keywords,
    icon: data.icon ? String(data.icon) : undefined,
    blog_name: data.blog_name ? String(data.blog_name) : undefined,
    blog_description: data.blog_description ? String(data.blog_description) : undefined,
    display_tags: Array.isArray(data.display_tags)
      ? (data.display_tags as unknown[]).map((item) => String(item))
      : undefined,
    display_categories: Array.isArray(data.display_categories)
      ? (data.display_categories as unknown[]).map((item) => String(item))
      : undefined,
    enable_math: data.enable_math === undefined ? true : Boolean(data.enable_math),
  };
}

export function getSocials(): SiteSocial[] {
  const socialsPath = path.join(CONTENT_ROOT, "data", "socials.yml");
  const raw = readFile(socialsPath);
  const data = (yaml.load(raw) ?? {}) as Record<string, unknown>;
  const result: SiteSocial[] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (!value) return;
    if (key === "rss_icon") {
      result.push({ id: "rss", label: "RSS", url: "/blog/feed.xml" });
      return;
    }
    if (key === "custom_social" && typeof value === "object") {
      const custom = value as { title?: string; url?: string; logo?: string };
      if (custom.url) {
        result.push({
          id: key,
          label: custom.title ?? "Custom",
          url: custom.url,
          icon: custom.logo,
        });
      }
      return;
    }
    if (typeof value === "string") {
      let url = value;
      let label = key.replace(/_/g, " ");
      if (key === "email") {
        url = `mailto:${value}`;
        label = value;
      }
      result.push({ id: key, label, url });
    } else if (typeof value === "object") {
      const record = value as Record<string, unknown>;
      if ("url" in record && typeof record.url === "string") {
        result.push({
          id: key,
          label: String(record.title ?? key),
          url: record.url,
          icon: typeof record.logo === "string" ? record.logo : undefined,
        });
      }
    }
  });

  return result;
}

export function getCvData(): CvData {
  const cvPath = path.join(CONTENT_ROOT, "data", "cv.yml");
  const raw = readFile(cvPath);
  const data = yaml.load(raw) as Record<string, unknown> | null;
  if (!data) {
    return { sections: [] };
  }

  const sectionsRaw = (data.sections as unknown[]) ?? [];
  const sections: CvSection[] = sectionsRaw
    .map((rawSection) => {
      if (typeof rawSection !== "object" || !rawSection) return null;
      const section = rawSection as Record<string, unknown>;
      const itemsRaw = (section.items as unknown[]) ?? [];
      const items: CvSectionItem[] = itemsRaw
        .map((rawItem) => normalizeCvItem(rawItem))
        .filter((item): item is CvSectionItem => Boolean(item));

      return {
        id: String(section.id ?? section.title ?? "section"),
        title: String(section.title ?? "Untitled"),
        items,
      };
    })
    .filter((section): section is CvSection => Boolean(section));

  const basics = typeof data.basics === "object" ? (data.basics as Record<string, unknown>) : undefined;

  return { basics, sections };
}

function normalizeCvItem(raw: unknown): CvSectionItem | null {
  if (typeof raw !== "object" || !raw) return null;
  const item = raw as Record<string, unknown>;
  const childrenRaw = (item.items as unknown[]) ?? [];
  const children = childrenRaw
    .map((child) => normalizeCvItem(child))
    .filter((child): child is CvSectionItem => Boolean(child));
  const linksRaw = (item.links as unknown[]) ?? [];
  const links = linksRaw
    .map((link) => {
      if (typeof link !== "object" || !link) return null;
      const record = link as Record<string, unknown>;
      if (!record.url) return null;
      return {
        label: String(record.label ?? record.title ?? "link"),
        url: String(record.url),
      };
    })
    .filter((link): link is { label: string; url: string } => Boolean(link));

  return {
    title: String(item.title ?? ""),
    subtitle: item.subtitle ? String(item.subtitle) : undefined,
    period: item.period ? String(item.period) : undefined,
    description: item.description ? String(item.description) : undefined,
    items: children,
    links,
  };
}

export interface RepositoriesConfig {
  github_users?: string[];
  github_repos?: string[];
  repo_description_lines_max?: number;
}

export function getRepositories(): RepositoriesConfig {
  const repositoriesPath = path.join(CONTENT_ROOT, "data", "repositories.yml");
  const raw = readFile(repositoriesPath);
  const data = yaml.load(raw);
  if (!data || typeof data !== "object") {
    return {};
  }
  const record = data as Record<string, unknown>;
  return {
    github_users: Array.isArray(record.github_users)
      ? (record.github_users as unknown[]).map((item) => String(item))
      : undefined,
    github_repos: Array.isArray(record.github_repos)
      ? (record.github_repos as unknown[]).map((item) => String(item))
      : undefined,
    repo_description_lines_max:
      typeof record.repo_description_lines_max === "number"
        ? record.repo_description_lines_max
        : undefined,
  };
}

export function getProfiles(): Record<string, unknown>[] {
  const profilesPath = path.join(CONTENT_ROOT, "data", "coauthors.yml");
  const raw = readFile(profilesPath);
  const data = yaml.load(raw);
  return Array.isArray(data) ? (data as Record<string, unknown>[]) : [];
}

export function getVenues(): Record<string, unknown> {
  const venuesPath = path.join(CONTENT_ROOT, "data", "venues.yml");
  const raw = readFile(venuesPath);
  const data = yaml.load(raw);
  return typeof data === "object" && data ? (data as Record<string, unknown>) : {};
}

export function getPublications(): PublicationsByYear[] {
  const bibPath = path.join(CONTENT_ROOT, "bibliography", "papers.bib");
  const raw = readFile(bibPath);
  const withoutFrontMatter = raw.replace(/^---[\s\S]*?---/, "").trim();
  const { content: withoutStrings, macros } = extractBibtexStrings(withoutFrontMatter);
  const normalizedInput = applyBibtexMacros(withoutStrings, macros);
  const parsed = bibtexParse.toJSON(normalizedInput);

  const entries: PublicationEntry[] = parsed.map((item) => {
    const tags = item.entryTags ?? {};
    const normalizeValue = (value: unknown): string | undefined => {
      if (value === undefined || value === null) return undefined;
      const rawValue = String(value).trim();
      if (!rawValue) return undefined;
      const macroMatch = macros.get(rawValue.toLowerCase());
      const resolved = macroMatch ?? stripWrapping(rawValue);
      return resolved;
    };
    const id = String(item.citationKey ?? tags.id ?? "entry");
    const title = normalizeValue(tags.title) ?? "Untitled";
    const year = normalizeValue(tags.year);
    const type = String(item.entryType ?? "article");
    const authors = normalizeValue(tags.author);
    const venueRaw = normalizeValue(tags.journal) ?? normalizeValue(tags.booktitle) ?? normalizeValue(tags.publisher);
    const url = normalizeValue(tags.url);
    const pdf = normalizeValue(tags.pdf);
    const html = normalizeValue(tags.html);
    const selected = String(tags.selected ?? tags.bibtex_show ?? "false").toLowerCase() === "true";

    const extra: Record<string, unknown> = {};
    Object.entries(tags).forEach(([key, value]) => {
      if (["title", "year", "author", "journal", "booktitle", "publisher", "url", "pdf", "html", "selected", "bibtex_show"].includes(key)) {
        return;
      }
      const normalized = normalizeValue(value);
      extra[key] = normalized ?? value;
    });

    return {
      id,
      title,
      authors,
      year,
      type,
      venue: venueRaw,
      url,
      pdf,
      html,
      selected,
      extra,
    };
  });

  const grouped = new Map<string, PublicationEntry[]>();
  entries.forEach((entry) => {
    const year = entry.year ?? "No year";
    const group = grouped.get(year) ?? [];
    group.push(entry);
    grouped.set(year, group);
  });

  const parseYear = (value: string) => {
    const numeric = Number.parseInt(value, 10);
    return Number.isNaN(numeric) ? 0 : numeric;
  };

  return Array.from(grouped.entries())
    .map(([year, groupEntries]) => ({
      year,
      entries: groupEntries.sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => parseYear(b.year) - parseYear(a.year));
}
