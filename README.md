# FattureHub Website

Landing page e pagina di download per **FattureHub**, l'app desktop open source per filtrare, analizzare ed esportare fatture elettroniche **FatturaPA** (XML/P7M).

Sito statico (SPA) costruito con [SvelteKit](https://kit.svelte.dev/) + [shadcn-svelte](https://www.shadcn-svelte.com/), servibile con nginx o qualsiasi server statico.

## Contenuti

- Landing page: hero, funzionalità, come funziona, CTA al download
- Pagina di download con rilevamento automatico del sistema operativo e tutti i formati disponibili (macOS Apple Silicon/Intel, Windows, Linux DEB/AppImage/RPM)
- Supporto tema chiaro e scuro

## Stack

- [SvelteKit](https://kit.svelte.dev/) + Svelte 5 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn-svelte](https://www.shadcn-svelte.com/) (bits-ui)
- Build statico con `@sveltejs/adapter-static`

## Sviluppo

```bash
npm install
npm run dev
```

Il sito è servito su `http://localhost:5174`.

## Build

```bash
npm run build
```

Produce una cartella `build/` con file HTML/CSS/JS statici, pronti per nginx:

```nginx
server {
    listen 80;
    server_name fatturehub.com;
    root /path/to/build;
    try_files $uri $uri/ /index.html;
}
```

Docker build disponibile:

```bash
docker build -t fatturehub-website .
```

## Repo correlati

- [FattureHub (app desktop)](https://github.com/lorenzo-vecchio/FattureHub) — applicazione Tauri + SvelteKit
