const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  env: {
    URL: "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
  },
  e2e: {
    baseUrl:
      "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
      // Register task for logging
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
      return config;
    },
  },
});
