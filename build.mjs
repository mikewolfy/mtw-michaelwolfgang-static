#!/usr/bin/env node
// Static site generator: renders src/pages.mjs into docs/ (served by GitHub Pages).
//   node build.mjs            -> build into ./docs
//   BASE_PATH=/repo/ node build.mjs   -> base path used only by 404.html
import { mkdirSync, writeFileSync, rmSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildPages } from './src/pages.mjs';
import { renderDocument, pageHead } from './src/layout.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'docs');
const basePath = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// 1. Static assets
cpSync(join(root, 'src', 'assets', 'css'), join(out, 'assets', 'css'), { recursive: true });
cpSync(join(root, 'src', 'assets', 'js'), join(out, 'assets', 'js'), { recursive: true });
cpSync(join(root, 'src', 'assets', 'images'), join(out, 'images'), { recursive: true });
cpSync(join(root, 'src', 'static'), out, { recursive: true }); // favicon.svg, games/…
writeFileSync(join(out, '.nojekyll'), '');

// 2. Pages
const pages = buildPages();
for (const page of pages) {
  const dir = join(out, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), renderDocument(page));
}

// 3. 404 page. GitHub Pages serves it at arbitrary depths, so it uses absolute URLs built from BASE_PATH.
{
  const html = renderDocument({
    path: '',
    title: 'Page not found',
    description: 'That page could not be found.',
    body: `<div class="wrap not-found"><div class="big">404</div><h1>Page not found</h1><p class="lede" style="margin:0 auto 1.5rem">The page you were looking for doesn’t exist or has moved.</p><a class="btn" href="${basePath}">Back to home</a></div>`,
  })
    // Rewrite relative asset/link URLs ("./", "assets/…") to absolute ones for this page only.
    .replace(/(href|src)="\.\/(?!")/g, `$1="${basePath}`)
    .replace(/(href|src)="(assets\/|favicon\.svg|images\/)/g, `$1="${basePath}$2`)
    .replace(/href="\.\/"/g, `href="${basePath}"`)
    .replace(/<title>[^<]*<\/title>/, '<title>Page not found — Michael Wolfgang</title>');
  writeFileSync(join(out, '404.html'), html);
}

console.log(`Built ${pages.length} pages + 404 into ${out}`);
