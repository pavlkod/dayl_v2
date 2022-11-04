exports.home = (req, res) => res.render("home");
exports.about = (req, res) => res.render("about", { test: "test" });
exports.notFound = (req, res) => res.status(404).render("404");
