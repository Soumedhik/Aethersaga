declare module "bibtex-parse-js" {
  export interface BibtexEntry {
    entryType: string;
    entryTags: Record<string, string>;
    citationKey?: string;
    [key: string]: unknown;
  }

  export function toJSON(input: string): BibtexEntry[];
  export function parse(input: string): BibtexEntry[];
}
