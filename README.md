# Portfolio — Mathis Bensacq

Site personnel de développeur full stack : une page d'accueil (projets, expérience, compétences, CV) et une page par projet.

**En ligne : <https://mbensacq.github.io/portfolio/>**

## Stack

- **React 19** et **TypeScript** strict, outillés par **Vite**
- **Prérendu statique** au build : un fichier HTML par page (accueil, pages projet, 404), servi sans attendre le JavaScript (lisible sans JS, aperçu propre sur LinkedIn), puis React l'hydrate
- **Routage statique** sans dépendance : les liens internes sont de vrais liens, chaque page a son titre et son URL canonique
- **Vitest** et **Testing Library** : structure des pages, routage, liens, accessibilité de base, cohérence du contenu
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
  pages/         Accueil, page d'un projet, page introuvable
  hooks/         Suivi de la section lue, pour la navigation latérale
  styles/        Feuille de style globale (jetons, mise en page, impression)
  routing.ts     Routes du site et chemins avec la base de déploiement
  entry-server.tsx  Rendu HTML de chaque page, utilisé par le prérendu
  main.tsx       Point d'entrée navigateur (hydratation)
scripts/
  prerender.mjs  Écrit le HTML prérendu de chaque page dans dist/
public/          CV PDF, favicon, image d'aperçu Open Graph, captures des projets
```

Pour mettre à jour le site, modifier `src/content/data.ts` (et remplacer `public/Mathis_BENSACQ_CV.pdf` si le CV change), puis pousser sur `main`.

Ajouter un projet : une entrée dans `projects` (`src/content/data.ts`) suffit, sa page `/projets/<id>/` est créée au build. Avec une capture dans `public/captures/` et le champ `image`, le projet passe en grande ligne illustrée sur l'accueil ; sans capture, il s'affiche en carte.

## Déploiement

GitHub Pages, source **GitHub Actions** (Settings → Pages → Build and deployment → Source). Le workflow `.github/workflows/ci.yml` construit `dist/` et le publie.
