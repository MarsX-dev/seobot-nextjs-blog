const BASE_URL = process.env.BASE_URL;

async function getSitemap() {
  const key = process.env.SEOBOT_API_KEY;
  if (!key) throw Error('SEOBOT_API_KEY enviroment variable must be set. You can use the DEMO key a8c58738-7b98-4597-b20a-0bb1c2fe5772 for testing - please set it in the root .env.local file.');

  try {
    const res = await fetch(`https://app.seobotai.com/api/sitemap?key=${key}`, { cache: 'no-store' });
    const result = await res.json();
    return result?.data;
  } catch {
    return { articles: [], categories: [], tags: [] };
  }
}

function toSitemapRecord(loc: string, updatedAt: string) {
  return `<url><loc>${new URL(loc, BASE_URL).toString()}</loc><lastmod>${updatedAt}</lastmod></url>`;
}

type SitemapItem = { slug: string; lastmod: string };

async function generateSiteMap() {
  const blogSitemap = await getSitemap();
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${BASE_URL}</loc>
    </url>
    <url>
      <loc>${BASE_URL}/blog</loc>
    </url>
     ${blogSitemap.articles.map((i: SitemapItem) => toSitemapRecord(`/blog/${i.slug}`, i.lastmod))}
     ${blogSitemap.categories.map((i: SitemapItem) => toSitemapRecord(`/blog/category/${i.slug}`, i.lastmod))}
     ${blogSitemap.tags.map((i: SitemapItem) => toSitemapRecord(`/blog/tag/${i.slug}`, i.lastmod))}
   </urlset>
 `;
}

export async function GET() {
  const body = await generateSiteMap();

  return new Response(body, {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  });
}
