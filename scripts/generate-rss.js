#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Read blog articles metadata
const blogArticlesPath = path.join(process.cwd(), 'src/data/blog-articles.json');
const blogArticles = JSON.parse(fs.readFileSync(blogArticlesPath, 'utf8'));

// Read LinkedIn posts metadata
const linkedinPostsPath = path.join(process.cwd(), 'src/data/linkedin-posts.json');
const linkedinPosts = JSON.parse(fs.readFileSync(linkedinPostsPath, 'utf8'));

// Read AI research data
const aiResearchPath = path.join(process.cwd(), 'src/data/summarised_results.json');
const aiResearchData = JSON.parse(fs.readFileSync(aiResearchPath, 'utf8'));

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
      ...linkedinPosts.map(post => ({...post, type: 'linkedin', title: `LinkedIn Post #${post.index}`, date: new Date().toISOString(), url: `https://giovanni-doni.github.io/#linkedin-post-${post.index}`})),
      ...aiResearchData.picked_headlines.map((headline, index) => ({
        type: 'ai-research',
        title: `AI Research: ${headline.summary}`,
        reason_for_choice: headline.reason_for_choice,
        date: new Date(Date.now() - (index * 12 * 60 * 60 * 1000)).toISOString(),
        link: headline.link,
        guid: `ai-research-${headline.item_number}`,
        category: 'AI Research, Machine Learning'
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const combinedRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Giovanni Doni - Blog, LinkedIn &amp; AI Research</title>
    <description>Latest blog posts, LinkedIn updates, and AI research highlights</description>
    <link>https://giovanni-doni.github.io/</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://giovanni-doni.github.io/rss/feed.xml" rel="self" type="application/rss+xml" />
    ${allContent.map(item => `
    <item>
      <title>${item.title}</title>
      <description><![CDATA[${
        item.type === 'blog' ? item.fullContent : 
        item.type === 'ai-research' ? item.reason_for_choice : 
        item.embedCode
      }]]></description>
      <link>${
        item.type === 'blog' ? `https://giovanni-doni.github.io/blog/${item.slug}` : 
        item.type === 'ai-research' ? item.link :
        item.url
      }</link>
      <guid>${
        item.type === 'blog' ? `https://giovanni-doni.github.io/blog/${item.slug}` : 
        item.type === 'ai-research' ? item.guid :
        item.url
      }</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <category>${
        item.type === 'blog' ? item.tags.join(', ') : 
        item.type === 'ai-research' ? item.category :
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
    
    // Write RSS files
    fs.writeFileSync('public/rss/blog.xml', blogRSS);
    fs.writeFileSync('public/rss/linkedin.xml', linkedinRSS);
    fs.writeFileSync('public/rss/feed.xml', combinedRSS);
    
    console.log('RSS feeds generated successfully');
    console.log('- Blog RSS: public/rss/blog.xml');
    console.log('- LinkedIn RSS: public/rss/linkedin.xml');
    console.log('- Combined RSS (includes AI research): public/rss/feed.xml');
    
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