#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function optimizeHTML() {
  try {
    const distPath = path.join(process.cwd(), 'dist');
    const htmlPath = path.join(distPath, 'index.html');

    if (!fs.existsSync(htmlPath)) {
      console.log('No index.html found in dist folder');
      return;
    }

    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Find the main CSS and JS files in the assets folder
    const assetsPath = path.join(distPath, 'assets');
    if (fs.existsSync(assetsPath)) {
      const files = fs.readdirSync(assetsPath);

      // Find main CSS file
      const cssFile = files.find(file => file.startsWith('index-') && file.endsWith('.css'));
      // Find main JS file
      const jsFile = files.find(file => file.startsWith('index-') && file.endsWith('.js'));

      let preloadHints = '';

      // Add preload for critical CSS with high priority
      if (cssFile) {
        preloadHints += `    <link rel="preload" href="/assets/${cssFile}" as="style" fetchpriority="high">\n`;
      }

      // Add preload for critical JS with high priority
      if (jsFile) {
        preloadHints += `    <link rel="preload" href="/assets/${jsFile}" as="script" fetchpriority="high">\n`;
      }

      // Insert preload hints after the existing preload section
      if (preloadHints) {
        const preloadComment = '    <!-- Preload critical resources with high priority -->';
        const insertPoint = htmlContent.indexOf(preloadComment);

        if (insertPoint !== -1) {
          const endOfLine = htmlContent.indexOf('\n', insertPoint);
          const nextLineStart = htmlContent.indexOf('\n', endOfLine + 1) + 1;

          htmlContent = htmlContent.slice(0, nextLineStart) +
                       preloadHints +
                       htmlContent.slice(nextLineStart);
        }
      }

      // Add fetchpriority="high" to critical script tags
      htmlContent = htmlContent.replace(
        /<script([^>]*src="[^"]*\/assets\/index-[^"]*\.js"[^>]*)>/g,
        '<script$1 fetchpriority="high">'
      );

      // Add fetchpriority="high" to critical link tags for CSS
      htmlContent = htmlContent.replace(
        /<link([^>]*href="[^"]*\/assets\/index-[^"]*\.css"[^>]*rel="stylesheet"[^>]*)>/g,
        '<link$1 fetchpriority="high">'
      );
      htmlContent = htmlContent.replace(
        /<link([^>]*rel="stylesheet"[^>]*href="[^"]*\/assets\/index-[^"]*\.css"[^>]*)>/g,
        '<link$1 fetchpriority="high">'
      );

      fs.writeFileSync(htmlPath, htmlContent);
      console.log('✅ HTML optimized with fetchpriority="high" for critical resources');

      if (cssFile) console.log(`   - Added preload for CSS: ${cssFile}`);
      if (jsFile) console.log(`   - Added preload for JS: ${jsFile}`);
    }

  } catch (error) {
    console.error('Error optimizing HTML:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizeHTML();
}

export { optimizeHTML };