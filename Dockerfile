FROM node:18-bullseye-slim AS node_base

WORKDIR /app

# Install system dependencies required for Sharp
RUN apt-get update && apt-get install -y \
  libvips \
  && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Dev
FROM node_base AS node_dev

ENV APP_ENV=dev
CMD [ "npm", "run", "dev" ]

# Prod
FROM node_base AS node_prod

ENV APP_ENV=prod
RUN npm run build
CMD [ "node", ".output/server/index.mjs" ]