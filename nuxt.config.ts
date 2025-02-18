// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    secureToken: process.env.NUXT_SECURE_TOKEN, // Private token
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://default-api-url.com',
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  routeRules: {
    '*': { cors: true,
      headers: {
        'Access-Control-Allow-Origin': 'https://your-allowed-origin.com'
      }
    }
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
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@pinia/colada-nuxt',
    'nuxt-auth-utils',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@samk-dev/nuxt-vcalendar',
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
  colorMode: {
    classSuffix:''
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})