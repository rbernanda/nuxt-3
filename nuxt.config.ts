import path from "path";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["nuxt-primevue", "@nuxtjs/google-fonts", "@pinia/nuxt"],
  primevue: {
    unstyled: true,
    importPT: { from: path.resolve(__dirname, "./presets/lara") },
  },
  googleFonts: {
    families: {
      "Plus+Jakarta+Sans": true,
    },
  },
});
