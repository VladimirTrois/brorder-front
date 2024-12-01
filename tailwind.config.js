/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        robotoSlab: ['"Roboto Slab"'],
      },
      colors: {
        'primary': '#172830',
        'primComplementary': '#284552',
        'secondary': '#8e1537',
        'secondComplementary': '#158E6C',
      },
    },
  },
  plugins: [],
}

