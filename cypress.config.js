const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.etsy.com'
  },
  env: {
    baseUrl: 'https://www.etsy.com'
  }
})
