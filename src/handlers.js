exports.home = (req, res) => res.render("home");
exports.about = (req, res) => res.render("about", { test: "test" });
exports.notFound = (req, res) => res.status(404).render("404");

exports.newsletterSignup = (req, res) => res.render("newsletter-signup");
exports.newsletterProcess = (req, res) => {
  console.log(req.body);
  res.redirect(303, "/newsletter-signup/thank-you");
};
exports.newsletterSuccess = (req, res) => res.render("newsletter-signup-thank-you");

exports.newsletterWithAjax = (req, res) => res.render("newsletter");
exports.api = {
  newsletterSuccess: (req, res) => {
    console.log(req.body);
    res.json({ result: `${req.body.name} was subscribed on ${req.body.email}` });
  },
};

exports.vacationPhotoContest = (req, res) => {
  const date = new Date();
  res.render("contest/vacation-photo", { year: date.getFullYear(), month: date.getMonth() });
};
exports.vacationPhotoContestProcessError = (req, res) => res.render("contest/vacation-photo-error");
exports.vacationPhotoContestProcessThankYou = (req, res) => res.render("contest/vacation-photo-thank-you");
exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log("field data: ", fields);
  console.log("files: ", files);
  res.redirect(303, "/contest/vacation-photo-thank-you");
};
