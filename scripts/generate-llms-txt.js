#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://giovannidoni.github.io';

// Read blog articles metadata
const blogArticlesPath = path.join(process.cwd(), 'src/data/blog-articles.json');
const blogArticles = JSON.parse(fs.readFileSync(blogArticlesPath, 'utf8'));

// Read LinkedIn posts metadata
const linkedinPostsPath = path.join(process.cwd(), 'src/data/linkedin-posts.json');
const linkedinPosts = JSON.parse(fs.readFileSync(linkedinPostsPath, 'utf8'));

// Read markdown content from blog posts
function readBlogContent(contentFile) {
  const filePath = path.join(process.cwd(), 'src/data/blog-posts', contentFile);
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`Warning: Could not read ${contentFile}:`, error.message);
    return '';
  }
}

function generateLlmsTxt() {
  const lines = [];

  lines.push('# Giovanni Doni');
  lines.push('');
  lines.push('> Tech Lead specialising in ML systems for energy and operational domains — BESS dispatch optimization, production forecasting, and distributed energy management.');
  lines.push('');
  lines.push('Giovanni Doni is an AI/ML Engineer and Tech Lead with a PhD in Computational Physics. He works at the intersection of machine learning, optimisation, and energy systems — including BESS optimisation, dispatch algorithms, and grid services. 10+ years owning the delivery of ML/AI systems in production, mentoring teams, and setting technical vision.');
  lines.push('');
  lines.push('## Contact');
  lines.push('');
  lines.push(`- Website: ${SITE_URL}`);
  lines.push('- LinkedIn: https://www.linkedin.com/in/giovanni-doni');
  lines.push('');
  lines.push('## Skills');
  lines.push('');
  lines.push('- **ML & AI**: LLMs, Computer Vision, NLP, MLOps, Deep Learning');
  lines.push('- **Infrastructure**: AWS, Kubernetes, Docker, Terraform, Spark');
  lines.push('- **Languages**: Python, SQL, Scala, R, TypeScript');
  lines.push('- **Frameworks**: TensorFlow, PyTorch, Scikit-learn, Pandas, Argo');
  lines.push('');
  lines.push('## Experience');
  lines.push('');
  lines.push('- **Founding Tech Lead** at Zenvi (June 2025 - Present) — Founding Tech Lead / Head of AI, owning technical and analytical foundations from zero to first product.');
  lines.push('- **Senior Machine Learning Engineer** at Deliveroo (Feb 2021 - 2025) — Led ML/AI initiatives, fine-tuned LLMs, developed models achieving £20M+ in cost savings.');
  lines.push('- **Research Advisor** at SUPSI (Mar 2020 - Feb 2022) — Applied ML to materials research, published in high-impact journals.');
  lines.push('- **Senior Machine Learning Engineer** at Tesco (Jul 2018 - Sep 2020) — Led ML-powered pricing, achieved 1%+ increase in retained profit.');
  lines.push('- **Senior Data Scientist** at SCL Elections (Aug 2015 - May 2018) — Built ML models for £10M+ projects across insurance, healthcare, and elections.');
  lines.push('');
  lines.push('## Education');
  lines.push('');
  lines.push('- PhD in Physics, King\'s College London (2011–2015)');
  lines.push('- MSc Material Engineering, University of Trieste (2008–2011), First Class Honours');
  lines.push('- BSc Industrial Engineering, University of Trieste (2004–2007), First Class Honours');
  lines.push('');
  lines.push('## Blog Posts (LabNotes)');
  lines.push('');

  for (const article of blogArticles) {
    lines.push(`- [${article.title}](${SITE_URL}/blog/${article.slug}): ${article.excerpt}`);
  }

  lines.push('');
  lines.push('## LinkedIn Posts');
  lines.push('');

  for (const post of linkedinPosts) {
    lines.push(`- [${post.title}](${post.url}): ${post.excerpt}`);
  }

  lines.push('');
  lines.push('## Optional');
  lines.push('');
  lines.push(`- [Full content version](${SITE_URL}/llms-full.txt): Complete blog post content for deeper context.`);
  lines.push(`- [RSS Feed](${SITE_URL}/rss/feed.xml): Subscribe to updates.`);
  lines.push('');

  return lines.join('\n');
}

function generateLlmsFullTxt() {
  const lines = [];

  // Start with the same summary
  lines.push('# Giovanni Doni — Full Content');
  lines.push('');
  lines.push('> Tech Lead specialising in ML systems for energy and operational domains — BESS dispatch optimization, production forecasting, and distributed energy management.');
  lines.push('');
  lines.push('This file contains the full text of all blog posts and LinkedIn content by Giovanni Doni.');
  lines.push('For a summary version, see /llms.txt');
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const article of blogArticles) {
    const content = readBlogContent(article.contentFile);
    lines.push(`## ${article.title}`);
    lines.push('');
    lines.push(`**Date**: ${article.date} | **Read time**: ${article.readTime} | **Tags**: ${article.tags.join(', ')}`);
    lines.push(`**URL**: ${SITE_URL}/blog/${article.slug}`);
    lines.push('');
    lines.push(content || article.excerpt);
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  lines.push('## LinkedIn Posts');
  lines.push('');

  for (const post of linkedinPosts) {
    lines.push(`### ${post.title}`);
    lines.push('');
    lines.push(`**Date**: ${post.date} | **URL**: ${post.url}`);
    lines.push('');
    lines.push(post.excerpt);
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  return lines.join('\n');
}

function main() {
  try {
    const llmsTxt = generateLlmsTxt();
    fs.writeFileSync('public/llms.txt', llmsTxt);
    console.log('Generated public/llms.txt');

    const llmsFullTxt = generateLlmsFullTxt();
    fs.writeFileSync('public/llms-full.txt', llmsFullTxt);
    console.log('Generated public/llms-full.txt');
  } catch (error) {
    console.error('Error generating llms.txt files:', error);
    process.exit(1);
  }
}

main();

export { generateLlmsTxt, generateLlmsFullTxt };
