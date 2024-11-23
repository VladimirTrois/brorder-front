// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

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
    '@nuxtjs/tailwindcss'
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
  }
})