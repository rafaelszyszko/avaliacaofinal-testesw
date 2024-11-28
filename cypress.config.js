const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://parabank.parasoft.com',
    setupNodeEvents(on, config) {
      // Implement event listeners if needed
    },
  },
});
