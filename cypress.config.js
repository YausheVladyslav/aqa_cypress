const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    runMode: 1,
    openMode: 0,
  },
  defaultCommandTimeout: 7000,
  defaultBrowser: 'chrome',
  viewportHeight: 1024,
  viewportWidth: 1440,
  e2e: {
    baseUrl: "https://qauto.forstudy.space/",
    specPattern: "cypress/e2e/**/*.{test,cy}.{js,jsx,ts,tsx}",
    watchForFileChanges: false,
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
