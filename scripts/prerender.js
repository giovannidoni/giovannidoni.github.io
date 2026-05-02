#!/usr/bin/env node

/**
 * prerender.js
 *
 * Post-build script that uses Puppeteer to render each route of the Vite SPA
 * into a static HTML file, enabling Google and LLM crawlers to read content
 * without executing JavaScript.
 *
 * Output: dist/<route>/index.html for each route
 * Compatible with GitHub Pages (static file serving).
 */

import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');

// All routes to prerender — must match routes in src/App.tsx
const ROUTES = [
  '/',
  '/privacy',
  '/blog/maltbot-howto',
  '/blog/deeper-in-the-stack',
  '/blog/fitting-intelligence',
  '/blog/scaling-llms-production-deliveroo',
  '/blog/dolomites-data-mountains-ml',
  '/blog/robust-ml-pipelines-kubernetes-argo',
];

// How long to wait after page load for React to fully render (ms)
const RENDER_TIMEOUT = 3000;

async function prerender() {
  console.log('🚀 Starting prerender...\n');

  // Serve the built dist/ folder with a static server
  const server = await createServer({
    root: distPath,
    server: {
      port: 5173,
      strictPort: true,
    },
    // Serve all routes from index.html (SPA fallback)
    appType: 'spa',
  });

  await server.listen();
  console.log(`📡 Static server running at http://localhost:5173\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  try {
    for (const route of ROUTES) {
      const url = `http://localhost:5173${route}`;
      console.log(`  Rendering: ${route}`);

      const page = await browser.newPage();

      // Suppress console noise from the page
      page.on('console', () => {});
      page.on('pageerror', () => {});

      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

        // Wait for React to fully render content
        await new Promise(resolve => setTimeout(resolve, RENDER_TIMEOUT));

        const html = await page.content();

        // Determine output path
        const outputDir = route === '/'
          ? distPath
          : path.join(distPath, route.slice(1));

        // Create directory if needed
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, 'index.html');
        fs.writeFileSync(outputPath, html, 'utf8');
        console.log(`  ✅ Saved: ${outputPath.replace(distPath, 'dist')}`);

      } catch (err) {
        console.error(`  ❌ Failed to render ${route}:`, err.message);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }

  console.log('\n✅ Prerender complete.');
}

prerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
