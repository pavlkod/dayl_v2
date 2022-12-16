const handlers = require("../handlers");
module.exports = app => {
  app.get("/", handlers.home);
  app.get("/about/", handlers.about);

  app.get("/newsletter-signup/", handlers.newsletterSignup);
  app.post("/newsletter-signup/process", handlers.newsletterProcess);
  app.get("/newsletter-signup/thank-you", handlers.newsletterSuccess);
};
