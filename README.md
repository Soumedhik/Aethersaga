## Aethersaga – Next.js Edition

Aethersaga is a Next.js 14 + TypeScript port of the popular [al-folio](https://github.com/alshedivat/al-folio) academic Jekyll theme. All markdown, YAML, BibTeX, and media assets were migrated from the original Ruby/Jekyll project so you can explore the full content without Docker, Bundler, or Ruby toolchains.

### Key Features
- **App Router architecture** with Tailwind CSS, Typography plugin, and custom layout
- **Markdown, YAML, and BibTeX loaders** that surface al-folio’s posts, news, projects, books, and publications
- **Pre-rendered sections** for About, Blog, Publications, Projects, News, Books, CV, Repositories, Teaching, and Profiles
- **KaTeX, syntax highlighting, GFM, and math support** via Unified/Remark/Rehype pipeline
- **Static assets** copied to `public/assets` so legacy image paths continue to work

### Project Structure

```
content/              # Migrated markdown, YAML, and BibTeX data from al-folio
public/assets/        # Copied assets (images, fonts, media) referenced by the content
src/app/              # Next.js routes (App Router)
src/components/       # Shared UI components (header, footer, markdown renderer, etc.)
src/lib/              # Content loaders and markdown utilities
src/types/            # Local TypeScript declarations
```

### Prerequisites
- Node.js ≥ 18.18
- npm (bundled with Node) – pnpm/yarn also work if you prefer

### Install Dependencies

```bash
npm install
```

### Local Development

```bash
npm run dev
```

Visit `http://localhost:3000` to browse the site. All content is statically generated from the files under `content/`.

### Production Build

```bash
npm run build
npm run start
```

This runs a full static generation pass and boots the production server.

### Customizing Content
- Update markdown pages, posts, news, and projects under `content/`
- Adjust YAML data in `content/data/` (socials, CV sections, repositories, coauthors, venues)
- Manage publications in `content/bibliography/papers.bib`
- Assets referenced from content should live under `public/`

### Credits
- Original theme: [al-folio](https://github.com/alshedivat/al-folio)
- Ported to Next.js by replacing Jekyll plugins with TypeScript loaders and React components

### License

The al-folio theme is distributed under the MIT License. Review `LICENSE` in the upstream repository for details before redistributing.
