const fs = require("fs/promises");
const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");

const handlers = require("./handlers");
const weatherMiddleware = require("./lib/middleware/getWeather");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(weatherMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => console.log(`server started on ${port}`));
