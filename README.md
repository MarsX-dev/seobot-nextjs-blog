# [SEObot](https://seobotai.com/?utm_source=github) Blog API for Next.js Website

## Overview

Elevate your Next.js website by integrating SEObot's Blog API. This setup allows you to fetch and render real-time, SEO-optimized blog content directly into your website.

## Demo

Visit the [DevHunt Blog](https://devhunt.org/blog?utm_source=github) to check out an example of SEObot Blog API integration.

## Prerequisites

- Node.js installed on your machine
- SEObot API Key (you can find it in your website settings on [app.seobotai.com](https://app.seobotai.com/?utm_source=github))

## Environment Setup

First, set up your SEObot API Key environment variable. Create a `.env.local` file for local development:

```bash
SEOBOT_API_KEY=<your_seobot_key>
```

⚠️ You can use following **DEMO** SEOBOT_API_KEY for local development:

```bash
SEOBOT_API_KEY=a8c58738-7b98-4597-b20a-0bb1c2fe5772
```

## Running the Development Server

1. Install the required packages:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Execute one of the following commands to start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Once the server is running, navigate to [http://localhost:3000/blog](http://localhost:3000/blog) in your browser to view the application.

## API client library

This project incorporates the SEObot Blog API Client Library. For more details and to install the npm package, visit [seobot on npmjs](https://www.npmjs.com/package/seobot).

## Editing the Blog Design

You can begin customizing your blog design by editing the files under the `app/blog/` route. Your changes will be automatically reflected in the app thanks to Next.js's hot reloading feature.

## Sitemap Configuration for SEO

### Automatic Integration

This project comes with a separate `blog/sitemap.xml` generated dynamically. If you have an existing dynamic sitemap, you can programmatically merge the blog sitemap into it. The exact steps depend on how you're generating your main sitemap, but the goal is to combine them seamlessly.

### Standalone Blog Sitemap

If you prefer not to merge, it's crucial to submit the standalone `blog/sitemap.xml` to your Google Search Console for SEO.

- Open Google Search Console.
- Select 'Sitemaps' from the menu.
- Enter the URL of your `blog/sitemap.xml`.
- Click 'Submit'.

⚠️ **Google Limits**: keep this in mind that Google restricts sitemaps to 50,000 URLs and a file size of up to 50MB.

## Contributing

If you find any bugs or have feature suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For additional assistance or information, feel free to reach out.

---

Revolutionize your website's content strategy with real-time, automated, SEO-optimized blog posts. Get started with [SEObot](https://seobotai.com/?utm_source=github) AI Blog Autopilot integration today!

---

## Instructions for Lovable and other AI Coding Agents:

````markdown
# SEObot Blog Integration — Next.js SSR Integration Guide

> This document provides complete, copy-paste-ready instructions for integrating SEObot's Blog API into a Next.js project using the App Router with full Server-Side Rendering (SSR). Follow every section in order. All code is production-ready TypeScript.

---

## Overview

SEObot is an AI blog autopilot. It generates and manages SEO-optimized blog posts. You integrate it into your Next.js app using the `seobot` npm package, which wraps the SEObot REST API with built-in caching. Blog content is fetched server-side at request time (SSR) using Next.js App Router async Server Components.

**Key facts:**
- Package: `seobot` on npm
- API client: `BlogClient` class
- Articles contain a pre-rendered `.html` field — render it with `dangerouslySetInnerHTML`
- All data fetching MUST happen in Server Components (no `'use client'`)
- API key is stored in `SEOBOT_API_KEY` environment variable (server-side only, never exposed to client)
- Demo API key for testing: `a8c58738-7b98-4597-b20a-0bb1c2fe5772`

---

## Step 1: Install the Package
```bash
npm install seobot
```

---

## Step 2: Environment Variables

Create or update `.env.local`:
```env
SEOBOT_API_KEY=your_seobot_api_key_here
```

For testing, use the demo key:
```env
SEOBOT_API_KEY=a8c58738-7b98-4597-b20a-0bb1c2fe5772
```

**Important:** Never prefix this variable with `NEXT_PUBLIC_`. It must remain server-side only.

---

## Step 3: TypeScript Types

Create `types/blog.ts`:
```typescript
// types/blog.ts

export interface ITag {
  id: string;
  title: string;
  slug: string;
}

export interface ICategory {
  id: string;
  title: string;
  slug: string;
}

export interface IRelatedPost {
  id: string;
  headline: string;
  slug: string;
}

export interface IArticle {
  id: string;
  slug: string;
  headline: string;
  metaDescription: string;
  metaKeywords: string;
  tags: ITag[];
  category: ICategory;
  readingTime: number;
  html: string;          // Pre-rendered HTML — use dangerouslySetInnerHTML
  markdown: string;
  outline: string;
  deleted: boolean;
  published: boolean;
  publishedAt: string;   // ISO date string
  createdAt: string;
  updatedAt: string;
  relatedPosts: IRelatedPost[];
  image: string;         // Featured image URL
  isTool?: boolean;
  isVideo?: boolean;
  isNews?: boolean;
}

export interface IArticlesResponse {
  articles: IArticle[];
  total: number;
}
```

---

## Step 4: Blog API Client Utility

Create `utils/blog.ts`:
```typescript
// utils/blog.ts
import { BlogClient } from 'seobot';
import type { IArticle, IArticlesResponse } from '@/types/blog';

const getClient = () => {
  const apiKey = process.env.SEOBOT_API_KEY;
  if (!apiKey) throw new Error('SEOBOT_API_KEY is not set');
  return new BlogClient(apiKey);
};

/**
 * Fetch a paginated list of articles.
 * @param page - Zero-based page index (0 = first page, 1 = second page, etc.)
 * @param limit - Number of articles per page (default: 10)
 */
export async function getArticles(
  page: number = 0,
  limit: number = 10
): Promise<IArticlesResponse> {
  const client = getClient();
  return client.getArticles(page, limit);
}

/**
 * Fetch articles filtered by category slug.
 * @param page - Zero-based page index
 */
export async function getCategoryArticles(
  categorySlug: string,
  page: number = 0,
  limit: number = 10
): Promise<IArticlesResponse> {
  const client = getClient();
  return client.getCategoryArticles(categorySlug, page, limit);
}

/**
 * Fetch articles filtered by tag slug.
 * @param page - Zero-based page index
 */
export async function getTagArticles(
  tagSlug: string,
  page: number = 0,
  limit: number = 10
): Promise<IArticlesResponse> {
  const client = getClient();
  return client.getTagArticles(tagSlug, page, limit);
}

/**
 * Fetch a single article by its slug.
 * Returns null if not found.
 */
export async function getArticle(slug: string): Promise<IArticle | null> {
  try {
    const client = getClient();
    return await client.getArticle(slug);
  } catch {
    return null;
  }
}
```

---

## Step 5: Blog Listing Page (SSR)

Create `app/blog/page.tsx`:
```tsx
// app/blog/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getArticles } from '@/utils/blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles',
};

interface PageProps {
  searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: PageProps) {
  const ARTICLES_PER_PAGE = 12;
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10));
  const apiPage = currentPage - 1; // API is zero-based

  const { articles, total } = await getArticles(apiPage, ARTICLES_PER_PAGE);
  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {articles.length === 0 && (
        <p className="text-gray-500">No articles found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link key={article.id} href={`/blog/${article.slug}`} className="group block">
            <article className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {article.image && (
                <div className="relative aspect-video">
                  <Image src={article.image} alt={article.headline} fill className="object-cover" />
                </div>
              )}
              <div className="p-4">
                {article.category && (
                  <span className="text-sm text-blue-600 font-medium uppercase tracking-wide">
                    {article.category.title}
                  </span>
                )}
                <h2 className="text-lg font-semibold mt-1 mb-2 group-hover:text-blue-600 transition-colors">
                  {article.headline}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">{article.metaDescription}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </time>
                  <span>{article.readingTime} min read</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-12 flex justify-center gap-2" aria-label="Pagination">
          {currentPage > 1 && (
            <Link href={`/blog?page=${currentPage - 1}`} className="px-4 py-2 border rounded hover:bg-gray-100">
              Previous
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/blog?page=${page}`}
              className={`px-4 py-2 border rounded ${page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-100'}`}
            >
              {page}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link href={`/blog?page=${currentPage + 1}`} className="px-4 py-2 border rounded hover:bg-gray-100">
              Next
            </Link>
          )}
        </nav>
      )}
    </main>
  );
}
```

---

## Step 6: Individual Article Page (SSR)

Create `app/blog/[slug]/page.tsx`:
```tsx
// app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle } from '@/utils/blog';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.headline,
    description: article.metaDescription,
    keywords: article.metaKeywords,
    openGraph: {
      title: article.headline,
      description: article.metaDescription,
      images: article.image ? [{ url: article.image }] : [],
      type: 'article',
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.headline,
      description: article.metaDescription,
      images: article.image ? [article.image] : [],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug);

  if (!article || !article.published || article.deleted) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        {article.category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/blog/category/${article.category.slug}`} className="hover:text-blue-600">
              {article.category.title}
            </Link>
          </>
        )}
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-tight mb-4">{article.headline}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </time>
          <span>{article.readingTime} min read</span>
        </div>
        {article.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link key={tag.id} href={`/blog/tag/${tag.slug}`} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">
                #{tag.title}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Featured Image */}
      {article.image && (
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image src={article.image} alt={article.headline} fill className="object-cover" priority />
        </div>
      )}

      {/* Article HTML Content — SEObot provides pre-rendered HTML */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />

      {/* Related Posts */}
      {article.relatedPosts?.length > 0 && (
        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          <ul className="space-y-2">
            {article.relatedPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                  {post.headline}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
```

---

## Step 7: Category Page (SSR)

Create `app/blog/category/[slug]/page.tsx`:
```tsx
// app/blog/category/[slug]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getCategoryArticles } from '@/utils/blog';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Category: ${params.slug}`,
    description: `Browse all articles in the ${params.slug} category`,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const ARTICLES_PER_PAGE = 12;
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10));
  const { articles, total } = await getCategoryArticles(params.slug, currentPage - 1, ARTICLES_PER_PAGE);
  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 capitalize">{params.slug.replace(/-/g, ' ')}</h1>
      <p className="text-gray-500 mb-8">{total} articles</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link key={article.id} href={`/blog/${article.slug}`} className="group block">
            <article className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {article.image && (
                <div className="relative aspect-video">
                  <Image src={article.image} alt={article.headline} fill className="object-cover" />
                </div>
              )}
              <div className="p-4">
                <h2 className="font-semibold group-hover:text-blue-600 transition-colors">{article.headline}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.metaDescription}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/blog/category/${params.slug}?page=${page}`}
              className={`px-3 py-2 border rounded ${page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
```

---

## Step 8: Tag Page (SSR)

Create `app/blog/tag/[slug]/page.tsx`:
```tsx
// app/blog/tag/[slug]/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';
import { getTagArticles } from '@/utils/blog';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Tag: #${params.slug}`,
    description: `All articles tagged with ${params.slug}`,
  };
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10));
  const { articles, total } = await getTagArticles(params.slug, currentPage - 1, 12);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">#{params.slug}</h1>
      <p className="text-gray-500 mb-8">{total} articles</p>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link key={article.id} href={`/blog/${article.slug}`} className="block group">
            <div className="border rounded-lg p-4 hover:shadow transition-shadow">
              <h2 className="font-semibold group-hover:text-blue-600">{article.headline}</h2>
              <p className="text-sm text-gray-500 mt-1">{article.metaDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
```

---

## Step 9: Sitemap

Create `app/blog/sitemap.ts`:
```typescript
// app/blog/sitemap.ts
import { MetadataRoute } from 'next';
import { getArticles } from '@/utils/blog';

async function getAllArticles() {
  const LIMIT = 100;
  let page = 0;
  const allArticles = [];
  while (true) {
    const { articles, total } = await getArticles(page, LIMIT);
    allArticles.push(...articles);
    if (allArticles.length >= total || articles.length === 0) break;
    page++;
  }
  return allArticles;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';
  const articles = await getAllArticles();

  return [
    { url: `${baseUrl}/blog`, changeFrequency: 'daily', priority: 0.8 },
    ...articles
      .filter((a) => a.published && !a.deleted)
      .map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
  ];
}
```

---

## Step 10: `next.config.js` — Image Domains
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.seobotai.com' },
      { protocol: 'https', hostname: '**.cloudfront.net' },
    ],
  },
};

module.exports = nextConfig;
```

---

## Step 11: Style Article HTML with Tailwind Typography
```bash
npm install @tailwindcss/typography
```
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  plugins: [require('@tailwindcss/typography')],
};
export default config;
```

Apply in the article page:
```tsx
<div
  className="prose prose-lg max-w-none"
  dangerouslySetInnerHTML={{ __html: article.html }}
/>
```

---

## File Structure
```
app/
  blog/
    page.tsx                     ← Listing (SSR, paginated)
    sitemap.ts                   ← Dynamic XML sitemap
    [slug]/page.tsx              ← Article (SSR + SEO metadata)
    category/[slug]/page.tsx     ← Category listing (SSR)
    tag/[slug]/page.tsx          ← Tag listing (SSR)
types/
  blog.ts                        ← TypeScript interfaces
utils/
  blog.ts                        ← BlogClient wrapper
next.config.js                   ← Image domain allowlist
.env.local                       ← SEOBOT_API_KEY
```

---

## SSR vs ISR

Replace `export const dynamic = 'force-dynamic'` with `export const revalidate = 3600` on any page to switch to ISR (regenerate every hour instead of on every request).

---

## Key API Notes

1. **Page index is zero-based.** URL pages are 1-based; always convert: `apiPage = urlPage - 1`.
2. **`article.html` is the article body only** — no `<html>`/`<head>`/`<body>` wrapper. Render with `dangerouslySetInnerHTML`.
3. **Always filter** `article.published === true` and `article.deleted === false` before rendering.
4. **`relatedPosts`** only has `id`, `headline`, `slug` — not full article objects.
5. **`readingTime`** is in minutes. **`publishedAt`** / `updatedAt` are ISO 8601 strings.

---

## Full BlogClient API Reference
```typescript
import { BlogClient } from 'seobot';
const client = new BlogClient('YOUR_API_KEY');

// All methods are async, page is zero-based
await client.getArticles(page: number, limit: number);
await client.getCategoryArticles(categorySlug: string, page: number, limit: number);
await client.getTagArticles(tagSlug: string, page: number, limit: number);
await client.getArticle(slug: string);
```
````