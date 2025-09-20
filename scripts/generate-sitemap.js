#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Read blog articles metadata
const blogArticlesPath = path.join(process.cwd(), 'src/data/blog-articles.json');
const blogArticles = JSON.parse(fs.readFileSync(blogArticlesPath, 'utf8'));

function generateSitemap() {
  try {
    const baseUrl = 'https://giovannidoni.github.io';
    const currentDate = new Date().toISOString().split('T')[0];

    // Define static pages with their priorities and change frequencies
    const staticPages = [
      { loc: '/', priority: '1.0', changefreq: 'weekly' },
      { loc: '/blog', priority: '0.9', changefreq: 'weekly' },
      { loc: '/privacy', priority: '0.3', changefreq: 'monthly' },
    ];

    // Generate blog post URLs
    const blogPostPages = blogArticles.map(article => ({
      loc: `/blog/${article.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: article.date
    }));

    // Combine all pages
    const allPages = [...staticPages, ...blogPostPages];

    // Generate sitemap XML
    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Write sitemap file
    const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXML);

    console.log('Sitemap generated successfully at public/sitemap.xml');
    console.log(`Total URLs: ${allPages.length}`);
    console.log(`- Static pages: ${staticPages.length}`);
    console.log(`- Blog posts: ${blogPostPages.length}`);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap };