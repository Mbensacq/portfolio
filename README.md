# Portfolio — Mathis Bensacq

Site personnel de développeur full stack : expérience, projets, compétences et CV.

**En ligne : <https://mbensacq.github.io/portfolio/>**

## Stack

- **React 19** et **TypeScript** strict, outillés par **Vite**
- **Prérendu statique** au build : le HTML complet est servi sans attendre le JavaScript (lisible sans JS, aperçu propre sur LinkedIn), puis React l'hydrate
- **Vitest** et **Testing Library** : structure de la page, liens, accessibilité de base, cohérence du contenu
- **ESLint** (typescript-eslint strict)
- **GitHub Actions** : lint, tests et build sur chaque PR ; déploiement sur GitHub Pages à chaque push sur `main`
- Police Schibsted Grotesk auto-hébergée (aucun appel à un CDN tiers)

## Démarrer

Prérequis : Node 22 (voir `.nvmrc`).

```bash
npm ci
npm run dev        # http://localhost:5173/portfolio/
npm run verify     # lint + tests + build
npm run preview    # sert le build de production
```

## Structure

```
src/
  content/       Contenu du site (source unique, typée) et sections de navigation
  components/    Composants de présentation
  styles/        Feuille de style globale (jetons, mise en page, impression)
  entry-server.tsx  Rendu HTML utilisé par le prérendu
  main.tsx       Point d'entrée navigateur (hydratation)
scripts/
  prerender.mjs  Injecte le HTML prérendu dans dist/index.html
public/          CV PDF, favicon, image d'aperçu Open Graph
```

Pour mettre à jour le site, modifier `src/content/data.ts` (et remplacer `public/Mathis_BENSACQ_CV.pdf` si le CV change), puis pousser sur `main`.

## Déploiement

GitHub Pages, source **GitHub Actions** (Settings → Pages → Build and deployment → Source). Le workflow `.github/workflows/ci.yml` construit `dist/` et le publie.
