# Brorder Front

## Informations

 Partie front de Brorder une application de gestion de commande. Cette application est réalisé pour un camping afin que les clients puissent commander du pain la veille pour le lendemain. Le camping doit ensuite pouvoir gérer ses produits et les commandes.
 
 L'application tourne avec NuxtJs / VueJs.

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


## All modules used 

```
npx nuxi@latest module add pinia
npx nuxi module add @pinia/colada-nuxt
npx nuxi@latest module add auth-utils
npx nuxi module add color-mode
npx nuxi module add icon
npm install vue-jwt-decode
npx nuxi@latest module add vueuse
npx nuxi@latest module add @samk-dev/nuxt-vcalendar
npm install --save-dev @nuxtjs/date-fns
npm i pinia-plugin-persistedstate
npm install multer
```