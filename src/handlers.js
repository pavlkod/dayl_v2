exports.home = (req, res) => res.render("home");
exports.about = (req, res) => res.render("about", { test: "test" });
exports.notFound = (req, res) => res.status(404).render("404");
exports.newsletterSignup = (req, res) => res.render("newsletter-signup");
exports.newsletterProcess = (req, res) => {
  console.log(req.body);
  res.redirect(303, "/newsletter-signup/thank-you");
};
exports.newsletterSuccess = (req, res) => res.render("newsletter-signup-thank-you");
