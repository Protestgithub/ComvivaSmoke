import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 20000,
  viewportWidth: 1200,
  viewportHeight: 900,
  trashAssetsBeforeRuns: true,
  videoCompression: false,
  videoUploadOnPasses: false,
  video: false,
  downloadsFolder: 'cypress/fixtures/templates',
  env: {
    Adminurl: 'http://172.25.49.185',
    apiBaseURL: 'http://172.25.49.185:3133',
  },
  projectId: 'yizpik',
  chromeWebSecurity: false,
  retries: {
    runMode: 0,
    openMode: 0,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.feature',
  },
})