/**
 * Generate public/Stuart-Crowley-CV.pdf from the built site's printable view.
 *
 * Usage:  npm run build && node scripts/generate-pdf.mjs
 * (or just `npm run pdf`, which does both)
 *
 * Serves dist/ locally, opens /?print=1 (the PrintableCV A4 view) in headless
 * Chromium, and prints it to a real, text-selectable PDF. The output lands in
 * public/ so it ships with the next build and is served at
 * <base>/Stuart-Crowley-CV.pdf — the target of every "Download PDF" button.
 */

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { extname, join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const BASE = '/stuart-crowley-cv/'; // must match vite.config.ts `base`
const OUT = join(ROOT, 'public', 'Stuart-Crowley-CV.pdf');

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.startsWith(BASE)) path = path.slice(BASE.length - 1);
    if (path === '/' || path === '') path = '/index.html';
    const body = await readFile(join(DIST, path));
    res.writeHead(200, { 'content-type': MIME[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});

await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const { port } = server.address();
const url = `http://127.0.0.1:${port}${BASE}?print=1`;

const executablePath =
  process.env.CHROMIUM_PATH ||
  (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

const browser = await chromium.launch({ executablePath });
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector('#cv-content', { timeout: 15000 });
  // Give web fonts a beat to settle so the PDF matches the screen render.
  await page.evaluate(() => document.fonts?.ready);

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, pdf);
  console.log(`Wrote ${OUT} (${(pdf.length / 1024).toFixed(0)} KB)`);
} finally {
  await browser.close();
  server.close();
}
