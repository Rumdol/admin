export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },

  build: {
    transpile: ['@popperjs/core'],
  },

  modules: [
    "@nuxtjs/eslint-module",
    "@pinia/nuxt",
    ["@vee-validate/nuxt", { autoImports: true }],
    "dayjs-nuxt",
    ["@vueuse/nuxt", { ssr: false }],
    ["@nuxtjs/sitemap"],
    "@element-plus/nuxt"
  ],

  css: [
    "~/assets/scss/index.scss",
    "bootstrap/dist/css/bootstrap.min.css"
  ],

  elementPlus: { /** Options */ },

  runtimeConfig: {
    public: {
      appBaseUrl: process.env.APP_BASE_URL,
      appSiteUrl: process.env.APP_SITE_URL,
      serverBaseUrl: process.env.SERVER_BASE_URL,
      serverApiUrl: process.env.SERVER_API_URL,
      apiVersion: process.env.API_VERSION
    }
  },

  app: {
    head: {
      title: "ITE"
    }
  },

  sitemap: {
    hostname: process.env.APP_SITE_URL || "https://yourwebsite.com",
    routes: async () => {
      return [
        "/page-1",
        "/page-2",
        "/products/product-1",
        "/products/product-2"
      ];
    },
    gzip: true,
    exclude: [
      "/admin/**"
    ]
  },

  plugins: [
    { src: '~/plugins/bootstrap.js', mode: 'client' }
  ],

  compatibilityDate: "2024-11-10"
});
