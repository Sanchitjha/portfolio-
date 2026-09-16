import { siteConfig } from '@/config/Meta';
import { getPublishedBlogPosts } from '@/lib/blog';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  const items = getPublishedBlogPosts()
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug}`;
      return [
        '    <item>',
        `      <title>${escapeXml(post.frontmatter.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(post.frontmatter.description)}</description>`,
        `      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(siteConfig.title)}</title>`,
    `    <link>${escapeXml(baseUrl)}</link>`,
    `    <description>${escapeXml(siteConfig.description)}</description>`,
    '    <language>en</language>',
    `    <atom:link href="${escapeXml(baseUrl + '/rss.xml')}" rel="self" type="application/rss+xml"/>`,
    items,
    '  </channel>',
    '</rss>',
  ].join('\n');

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
