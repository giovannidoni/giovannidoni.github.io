#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Read blog articles metadata
const blogArticlesPath = path.join(process.cwd(), 'src/data/blog-articles.json');
const blogArticles = JSON.parse(fs.readFileSync(blogArticlesPath, 'utf8'));

// Read LinkedIn posts metadata
const linkedinPostsPath = path.join(process.cwd(), 'src/data/linkedin-posts.json');
const linkedinPosts = JSON.parse(fs.readFileSync(linkedinPostsPath, 'utf8'));

// Function to read markdown content from blog posts
function readBlogContent(contentFile) {
  const filePath = path.join(process.cwd(), 'src/data/blog-posts', contentFile);
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`Warning: Could not read ${contentFile}:`, error.message);
    return '';
  }
}

function generateRSSFeeds() {
  try {
    // Add full content to each blog article by reading from markdown files
    const blogArticlesWithContent = blogArticles.map(article => {
      const fullContent = readBlogContent(article.contentFile);
      return { ...article, fullContent };
    });

    // Generate combined RSS only
    const allContent = [
      ...blogArticlesWithContent.map(article => ({...article, type: 'blog'})),
      ...linkedinPosts.map(post => ({
        ...post,
        type: 'linkedin',
        description: post.excerpt
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    const combinedRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Giovanni Doni - Blog &amp; LinkedIn</title>
    <description>Latest blog posts and LinkedIn updates from Giovanni Doni</description>
    <link>https://giovannidoni.github.io/</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://giovannidoni.github.io/rss/feed.xml" rel="self" type="application/rss+xml" />
    ${allContent.map(item => `
    <item>
      <title>${item.title}</title>
      <description><![CDATA[${
        item.type === 'blog' ? item.fullContent :
        item.description || `LinkedIn Post #${item.index} by Giovanni Doni. View the full post on LinkedIn.`
      }]]></description>
      <link>${
        item.type === 'blog' ? `https://giovannidoni.github.io/blog/${item.slug}` :
        item.url
      }</link>
      <guid>${
        item.type === 'blog' ? `https://giovannidoni.github.io/blog/${item.slug}` :
        item.url
      }</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <category>${
        item.type === 'blog' ? item.tags.join(', ') :
        'LinkedIn'
      }</category>
      <author>Giovanni Doni</author>
    </item>`).join('')}
  </channel>
</rss>`;

    // Ensure RSS directory exists
    if (!fs.existsSync('public/rss')) {
      fs.mkdirSync('public/rss', { recursive: true });
    }

    // Write only the combined RSS file
    fs.writeFileSync('public/rss/feed.xml', combinedRSS);

    console.log('RSS feed generated successfully');
    console.log('- Combined RSS: public/rss/feed.xml');
    
  } catch (error) {
    console.error('Error generating RSS feeds:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateRSSFeeds();
}

export { generateRSSFeeds };