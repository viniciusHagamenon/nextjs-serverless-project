import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 10000,
    // Most common viewport size
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
})
