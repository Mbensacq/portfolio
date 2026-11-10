// Prérendu statique : écrit un fichier HTML par page (accueil, pages projet, 404) dans dist/.
// Lancé par `npm run build` après les builds client (dist/) et serveur (dist-ssr/).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PLACEHOLDER = '<!--app-html-->';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const templatePath = path.join(distDir, 'index.html');
const ssrDir = path.join(root, 'dist-ssr');
const serverEntry = path.join(ssrDir, 'entry-server.js');

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function escapeText(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
}

/** Remplace l'unique occurrence d'un motif ; échoue si index.html a changé de forme. */
function replaceOnce(html, pattern, replacement, label) {
  const matches = html.match(new RegExp(pattern.source, `${pattern.flags.replace('g', '')}g`));
  if (!matches || matches.length !== 1) {
    throw new Error(`Métadonnée « ${label} » : ${matches?.length ?? 0} occurrence(s) dans index.html, 1 attendue`);
  }
  // Remplaçant sous forme de fonction : évite l'interprétation des motifs « $& », « $1 »…
  return html.replace(pattern, (_match, before, after) => `${before}${replacement}${after}`);
}

function applyMeta(html, meta) {
  const title = escapeText(meta.title);
  const titleAttribute = escapeAttribute(meta.title);
  const description = escapeAttribute(meta.description);

  let result = html;
  result = replaceOnce(result, /(<title>)[^<]*(<\/title>)/, title, 'title');
  result = replaceOnce(result, /(<meta\s+name="description"\s+content=")[^"]*(")/, description, 'description');
  result = replaceOnce(result, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, titleAttribute, 'og:title');
  result = replaceOnce(
    result,
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    description,
    'og:description',
  );

  if (meta.url) {
    const url = escapeAttribute(meta.url);
    result = replaceOnce(result, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url, 'canonical');
    result = replaceOnce(result, /(<meta\s+property="og:url"\s+content=")[^"]*(")/, url, 'og:url');
  } else {
    // Page d'erreur : ni URL canonique ni indexation.
    result = replaceOnce(result, /()<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>()/, '', 'canonical');
    result = replaceOnce(result, /(<\/title>)()/, '\n    <meta name="robots" content="noindex" />', 'robots');
  }
  return result;
}

const template = await readFile(templatePath, 'utf8');
if (!template.includes(PLACEHOLDER)) {
  throw new Error(`Marqueur ${PLACEHOLDER} absent de ${templatePath}`);
}

const { renderPages } = await import(pathToFileURL(serverEntry).href);
const pages = renderPages();
if (!Array.isArray(pages) || pages.length === 0) {
  throw new Error('Le rendu serveur n’a renvoyé aucune page');
}

for (const page of pages) {
  if (typeof page.html !== 'string' || page.html.length === 0) {
    throw new Error(`Le rendu serveur a renvoyé un HTML vide pour ${page.file}`);
  }
  const withMeta = page.meta ? applyMeta(template, page.meta) : template;
  const outputPath = path.join(distDir, page.file);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, withMeta.replace(PLACEHOLDER, () => page.html), 'utf8');
  console.log(`Prérendu : ${path.relative(root, outputPath)} (${page.html.length} caractères)`);
}

await rm(ssrDir, { recursive: true, force: true });
