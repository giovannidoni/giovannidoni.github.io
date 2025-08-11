import blogArticlesData from '../data/blog-articles.json';
import linkedinPostsData from '../data/linkedin-posts.json';
import aiResearchData from '../data/summarised_results.json';

interface BlogArticle {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  contentFile: string;
}

interface LinkedinPost {
  index: number;
  type: string;
  embedCode: string;
}

interface AIResearchData {
  picked_headlines: Array<{
    item_number: number;
    summary: string;
    link: string;
    reason_for_choice: string;
  }>;
  digest: string;
}

const generateBlogRSSFeed = (): string => {
  const articles = blogArticlesData as BlogArticle[];
  const baseUrl = window.location.origin;
  const pubDate = new Date().toUTCString();

  const rssItems = articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt}]]></description>
      <link>${baseUrl}/blog/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${article.tags.join(', ')}</category>
      <author>Your Name</author>
    </item>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[Blog Articles]]></title>
    <description><![CDATA[Latest blog articles on machine learning, AI, and technology]]></description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss/blog.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <pubDate>${pubDate}</pubDate>
    <ttl>1440</ttl>
    ${rssItems}
  </channel>
</rss>`;
};

const generateLinkedInRSSFeed = (): string => {
  const posts = linkedinPostsData as LinkedinPost[];
  const baseUrl = window.location.origin;
  const pubDate = new Date().toUTCString();

  const rssItems = posts.map((post, index) => `
    <item>
      <title><![CDATA[LinkedIn Post #${post.index}]]></title>
      <description><![CDATA[${post.embedCode}]]></description>
      <link>${baseUrl}/#linkedin-post-${post.index}</link>
      <guid isPermaLink="false">linkedin-post-${post.index}</guid>
      <pubDate>${new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toUTCString()}</pubDate>
      <category>LinkedIn, Social Media</category>
      <author>Your Name</author>
    </item>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[LinkedIn Posts]]></title>
    <description><![CDATA[Latest LinkedIn posts and updates]]></description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss/linkedin.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <pubDate>${pubDate}</pubDate>
    <ttl>1440</ttl>
    ${rssItems}
  </channel>
</rss>`;
};

const generateCombinedRSSFeed = (): string => {
  const articles = blogArticlesData as BlogArticle[];
  const posts = linkedinPostsData as LinkedinPost[];
  const research = aiResearchData as AIResearchData;
  const baseUrl = window.location.origin;
  const pubDate = new Date().toUTCString();

  // Combine and sort all content by date
  const allContent = [
    // Blog articles
    ...articles.map(article => ({
      type: 'blog',
      title: article.title,
      description: article.excerpt,
      link: `${baseUrl}/blog/${article.slug}`,
      guid: `${baseUrl}/blog/${article.slug}`,
      date: new Date(article.date),
      category: article.tags.join(', ')
    })),
    // LinkedIn posts
    ...posts.map((post, index) => ({
      type: 'linkedin',
      title: `LinkedIn Post #${post.index}`,
      description: post.embedCode,
      link: `${baseUrl}/#linkedin-post-${post.index}`,
      guid: `linkedin-post-${post.index}`,
      date: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)),
      category: 'LinkedIn, Social Media'
    })),
    // AI Research headlines
    ...research.picked_headlines.map((headline, index) => ({
      type: 'ai-research',
      title: `AI Research: ${headline.summary}`,
      description: headline.reason_for_choice,
      link: headline.link,
      guid: `ai-research-${headline.item_number}`,
      date: new Date(Date.now() - (index * 12 * 60 * 60 * 1000)),
      category: 'AI Research, Machine Learning'
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const rssItems = allContent.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid isPermaLink="${item.type === 'blog' ? 'true' : 'false'}">${item.guid}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <category>${item.category}</category>
      <author>Your Name</author>
    </item>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[Giovanni Doni - Blog & Updates]]></title>
    <description><![CDATA[Latest blog articles and LinkedIn updates on machine learning, AI, and technology]]></description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <pubDate>${pubDate}</pubDate>
    <ttl>1440</ttl>
    ${rssItems}
  </channel>
</rss>`;
};

export const downloadRSSFeeds = () => {
  // Download combined RSS feed
  const combinedRSS = generateCombinedRSSFeed();
  const combinedBlob = new Blob([combinedRSS], { type: 'application/rss+xml' });
  const combinedUrl = URL.createObjectURL(combinedBlob);
  const combinedLink = document.createElement('a');
  combinedLink.href = combinedUrl;
  combinedLink.download = 'feed.xml';
  document.body.appendChild(combinedLink);
  combinedLink.click();
  document.body.removeChild(combinedLink);
  URL.revokeObjectURL(combinedUrl);
};

export { generateBlogRSSFeed, generateLinkedInRSSFeed, generateCombinedRSSFeed };