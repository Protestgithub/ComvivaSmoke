import { defineConfig } from 'cypress'

const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const nodePolyfills =
  require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
  const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports =  defineConfig({
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
    "Adminurl": "http://172.25.48.150",
    "apiBaseURL": "http://172.25.48.150:3133"
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
      on(
        'file:preprocessor',
        createBundler({
          plugins: [nodePolyfills(), createEsbuildPlugin(config)],
        })
      )
      allureWriter(on, config);

    },
      
    specPattern: 'cypress/e2e/**/*.feature',
  },
})