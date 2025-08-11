#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function generateRSSFeeds() {
  try {
    // Read blog articles
    const blogArticles = JSON.parse(fs.readFileSync('src/data/blog-articles.json', 'utf8'));
    
    // Read full content for each blog article
    const blogArticlesWithContent = blogArticles.map(article => {
      try {
        const contentPath = `src/data/blog-posts/${article.contentFile}`;
        const fullContent = fs.readFileSync(contentPath, 'utf8');
        return { ...article, fullContent };
      } catch (error) {
        console.warn(`Could not read content for ${article.slug}:`, error.message);
        return { ...article, fullContent: article.excerpt };
      }
    });
    
    // Read LinkedIn posts
    const linkedinPosts = JSON.parse(fs.readFileSync('src/data/linkedin-posts.json', 'utf8'));
    
    // Generate blog RSS
    const blogRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Giovanni Doni - Blog</title>
    <description>Latest blog posts on machine learning, AI, and technology</description>
    <link>https://giovanni-doni.github.io/</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://giovanni-doni.github.io/rss/blog.xml" rel="self" type="application/rss+xml" />
    ${blogArticlesWithContent.map(article => `
    <item>
      <title>${article.title}</title>
      <description><![CDATA[${article.fullContent}]]></description>
      <link>https://giovanni-doni.github.io/blog/${article.slug}</link>
      <guid>https://giovanni-doni.github.io/blog/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${article.tags.join(', ')}</category>
      <author>Giovanni Doni</author>
    </item>`).join('')}
  </channel>
</rss>`;
    
    // Generate LinkedIn RSS
    const linkedinRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Giovanni Doni - LinkedIn Updates</title>
    <description>Latest LinkedIn posts and updates</description>
    <link>https://giovanni-doni.github.io/</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://giovanni-doni.github.io/rss/linkedin.xml" rel="self" type="application/rss+xml" />
    ${linkedinPosts.map(post => `
    <item>
      <title>LinkedIn Post #${post.index}</title>
      <description><![CDATA[${post.embedCode}]]></description>
      <link>https://giovanni-doni.github.io/#linkedin-post-${post.index}</link>
      <guid>https://giovanni-doni.github.io/#linkedin-post-${post.index}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>LinkedIn</category>
      <author>Giovanni Doni</author>
    </item>`).join('')}
  </channel>
</rss>`;
    
    // Generate combined RSS
    const allContent = [
      ...blogArticlesWithContent.map(article => ({...article, type: 'blog'})),
      ...linkedinPosts.map(post => ({...post, type: 'linkedin', title: `LinkedIn Post #${post.index}`, date: new Date().toISOString(), url: `https://giovanni-doni.github.io/#linkedin-post-${post.index}`}))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const combinedRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Giovanni Doni - Blog &amp; LinkedIn Updates</title>
    <description>Latest blog posts and LinkedIn updates</description>
    <link>https://giovanni-doni.github.io/</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://giovanni-doni.github.io/rss/feed.xml" rel="self" type="application/rss+xml" />
    ${allContent.map(item => `
    <item>
      <title>${item.title}</title>
      <description><![CDATA[${item.type === 'blog' ? item.fullContent : item.embedCode}]]></description>
      <link>${item.type === 'blog' ? `https://giovanni-doni.github.io/blog/${item.slug}` : item.url}</link>
      <guid>${item.type === 'blog' ? `https://giovanni-doni.github.io/blog/${item.slug}` : item.url}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <category>${item.type === 'blog' ? item.tags.join(', ') : 'LinkedIn'}</category>
      <author>Giovanni Doni</author>
    </item>`).join('')}
  </channel>
</rss>`;
    
    // Ensure RSS directory exists
    if (!fs.existsSync('public/rss')) {
      fs.mkdirSync('public/rss', { recursive: true });
    }
    
    // Write RSS files
    fs.writeFileSync('public/rss/blog.xml', blogRSS);
    fs.writeFileSync('public/rss/linkedin.xml', linkedinRSS);
    fs.writeFileSync('public/rss/feed.xml', combinedRSS);
    
    console.log('RSS feeds generated successfully');
    console.log('- Blog RSS: public/rss/blog.xml');
    console.log('- LinkedIn RSS: public/rss/linkedin.xml');
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