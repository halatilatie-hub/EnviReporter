export default defineNuxtConfig({
  devtools: { enabled: false },
  srcDir: 'src',
  compatibilityDate: '2026-10-01',
  css: ['~/assets/main.css'],
  runtimeConfig: {
    public: {
      routeApiBaseUrl: ''
    }
  },
  app: {
    head: {
      title: 'EnviReporter',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  }
})
