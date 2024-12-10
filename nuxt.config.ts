// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  routeRules: {
    '*': { cors: true }
  },

  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    {
      path: '~/components',
      pathPrefix: false,    
    },
  ],

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
    'nuxt-open-fetch',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    'nuxt-auth-utils'
  ],
  image: {
    // You can customize the image settings here if needed
  },
  fonts: {
    // Options
    families: [
      // only resolve this font with the `google` provider
      { name: 'Roboto Slab', provider: 'google' },
    ],
    defaults: {
      styles: ['normal'],
    }
  },
  openFetch: {
    clients: {
      brorder: {
        schema: process.env.API_SCHEMA_URL,
        baseURL: process.env.API_BASE_URl
      }
    }
  }
})