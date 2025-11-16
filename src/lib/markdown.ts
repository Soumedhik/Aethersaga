import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import remarkDirective from "remark-directive";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const figureIncludeRegex = /\{\%\s*include\s+figure\.liquid([^%]*)\%\}/g;
const citeRegex = /\{\%\s*cite\s+([^%]+)\%\}/g;
const rawOpenRegex = /\{\%\s*raw\s*\%\}/g;
const rawCloseRegex = /\{\%\s*endraw\s*\%\}/g;
const attributeListRegex = /\{\:\s*[^}]+\}/g;
const highlightBlockRegex = /\{\%\s*highlight\s+([^\s%}]+)[^%]*\%\}([\s\S]*?)\{\%\s*endhighlight\s*\%\}/g;
const siteVariableRegex = /\{\{\s*site\.[^}]+\}\}/g;
const pageVariableRegex = /\{\{\s*page\.[^}]+\}\}/g;

function convertFigureInclude(source: string): string {
  return source.replace(figureIncludeRegex, (_, attrs) => {
    const pathMatch = attrs.match(/path="([^"]+)"/);
    const titleMatch = attrs.match(/title="([^"]+)"/);
    const classMatch = attrs.match(/class="([^"]+)"/);
    const loadingMatch = attrs.match(/loading="([^"]+)"/);

    const src = pathMatch ? pathMatch[1] : "";
    const alt = titleMatch ? titleMatch[1] : "";
    const className = classMatch ? classMatch[1] : "";
    const loading = loadingMatch ? loadingMatch[1] : undefined;

    const attributes = [
      src ? `src="/${src.replace(/^\//, "")}"` : "",
      "alt=\"" + (alt || "Figure") + "\"",
      className ? `class="${className}"` : "",
      loading ? `loading="${loading}"` : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `<img ${attributes} />`;
  });
}

function convertHighlightBlocks(source: string): string {
  return source.replace(highlightBlockRegex, (_, lang, code) => {
    const language = typeof lang === "string" ? lang.trim() : "";
    const cleaned = code.replace(/^\n+|\n+$/g, "");
    return `\n\n\`\`\`${language}\n${cleaned}\n\`\`\`\n\n`;
  });
}

function preprocessMarkdown(markdown: string): string {
  let output = markdown;
  output = output.replace(rawOpenRegex, "");
  output = output.replace(rawCloseRegex, "");
  output = convertHighlightBlocks(output);
  output = convertFigureInclude(output);
  output = output.replace(citeRegex, (_, keys) => {
    const label = keys
      .split(",")
      .map((key: string) => key.trim())
      .filter(Boolean)
      .join(", ");
    return label ? `<span class="citation">[${label}]</span>` : "";
  });
  output = output.replace(attributeListRegex, "");
  output = output.replace(siteVariableRegex, "");
  output = output.replace(pageVariableRegex, "");
  return output;
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const cleaned = preprocessMarkdown(markdown);
  const file = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["anchor-link"] },
    })
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(cleaned);

  return String(file);
}
