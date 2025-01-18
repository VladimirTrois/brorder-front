export default defineAppConfig({
  title: 'Commande Pain',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  description: 'Site pour commander du pain.',
  author: 'Vladimir Trois',
  link: [
    {
      rel: 'icon',
      sizes: '36x36',
      type: 'image/x-icon',
      href: '/favicon.pico',
    },
    {
      rel: 'preload',
      as: 'font',
      href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap',
      crossorigin: 'anonymous',
    },
  ],
});
