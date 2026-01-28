import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  const pages = [
    '/',
    '/la-ia-no-decide-por-ti',
  ];

  const site = 'https://eluniversodelamente.com';

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${site}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
