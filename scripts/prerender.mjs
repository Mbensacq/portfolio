// Prérendu statique : injecte le HTML de l'application dans dist/index.html.
// Lancé par `npm run build` après les builds client (dist/) et serveur (dist-ssr/).
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PLACEHOLDER = '<!--app-html-->';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = path.join(root, 'dist', 'index.html');
const ssrDir = path.join(root, 'dist-ssr');
const serverEntry = path.join(ssrDir, 'entry-server.js');

const template = await readFile(templatePath, 'utf8');
if (!template.includes(PLACEHOLDER)) {
  throw new Error(`Marqueur ${PLACEHOLDER} absent de ${templatePath}`);
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();
if (typeof appHtml !== 'string' || appHtml.length === 0) {
  throw new Error('Le rendu serveur a renvoyé un HTML vide');
}

// Remplaçant sous forme de fonction : évite l'interprétation des motifs « $& », « $1 »… du HTML.
await writeFile(templatePath, template.replace(PLACEHOLDER, () => appHtml), 'utf8');
await rm(ssrDir, { recursive: true, force: true });

console.log(`Prérendu écrit dans ${path.relative(root, templatePath)} (${appHtml.length} caractères)`);
