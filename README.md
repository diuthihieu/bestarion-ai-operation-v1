# Bestarion AI Operation V1

React + Vite + TypeScript project packaged for GitHub Pages deployment.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages deployment

This project is configured for repository name `bestarion-ai-operation-v1`.

Vite base path is set in `vite.config.ts`:

```ts
base: '/bestarion-ai-operation-v1/'
```

After pushing to the `main` branch, GitHub Actions will build and deploy the site to GitHub Pages.
