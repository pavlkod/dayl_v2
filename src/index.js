const fs = require("fs/promises");
const path = require("path");
const multiparty = require("multiparty");
const express = require("express");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const handlers = require("./handlers");
const weatherMiddleware = require("./lib/middleware/getWeather");
const { credentionals } = require("./credentials");
const flashMiddleware = require("./lib/middleware/flash");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(weatherMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(credentionals.cookieSecret));
app.use(expressSession({ secret: credentionals.cookieSecret, resave: true, saveUninitialized: true }));
app.use(flashMiddleware);

app.engine(
  "handlebars",
  engine({
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set("view engine", "handlebars");

app.get("/", handlers.home);
app.get("/about/", handlers.about);

app.get("/newsletter-signup/", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSuccess);

app.get("/newsletter", handlers.newsletterWithAjax);
app.post("/api/newsletter", handlers.api.newsletterSuccess);

// vacation photo contest
app.get("/contest/vacation-photo", handlers.vacationPhotoContest);
app.post("/contest/vacation-photo/:year/:month", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return handlers.vacationPhotoContestProcessError(req, res, err.message);
    console.log("got fields: ", fields);
    console.log("and files: ", files);
    handlers.vacationPhotoContestProcess(req, res, fields, files);
  });
});
app.get("/contest/vacation-photo-thank-you", handlers.vacationPhotoContestProcessThankYou);

app.get("/contest/vacation-photo-ajax", handlers.vacationPhotoContestAjax);
app.post("/api/vacation-photo-contest/:year/:month", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return handlers.api.vacationPhotoContestError(req, res, err.message);
    handlers.api.vacationPhotoContest(req, res, fields, files);
  });
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => console.log(`server started on ${port}`));
