import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-01',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  sourcemap: true,
  app: {
    head: {
      title: 'Github-Trending',
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxthub/core',
  ],
});
