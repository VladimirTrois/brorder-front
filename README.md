# Brorder Front

Partie Front d'une application de gestion de commande pour un camping. 

Réalisé avec NuxtJs.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
docker compose build
docker compose up -d --wait
```

## Production

Build the application for production:

```bash
docker compose -f compose.yaml -f compose.prod.yaml build
docker compose -f compose.yaml -f compose.prod.yaml up -d --wait
```

Without docker: 

```bash
# npm
npm run dev
```

```bash
# npm
npm run build
node .output/server/index.mjs
```

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
