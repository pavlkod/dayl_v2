const db = require("./db");

exports.home = (req, res) => res.render("home");
exports.about = (req, res) => res.render("about", { test: "test" });
exports.notFound = (req, res) => res.status(404).render("404");

exports.dbMiddleware = credentionals => {
  const mongoose = require("mongoose");
  return (req, res, next) => {
    const {
      mongo: { connectionstring },
    } = credentionals;
    if (connectionstring) {
      console.log(connectionstring);
      mongoose.connect(connectionstring);
      const db = mongoose.connection;
      db.on("error", err => {
        console.error("Ошибка MongoDB: " + err.message);
      });
      db.once("open", () => console.log("Установлено соединение c MongoDB"));
    }
    next();
  };
};

exports.newsletterSignup = async (req, res) => {
  const Vacation = require("./models/vacation");
  await new Vacation({
    name: "Rock Climbing in Bend",
    slug: "rock-climbing-in-bend",
    category: "Adventure",
    sku: "B99",
    description: "Experience the thrill of climbing in the high desert.",
    price: 289.95,
    tags: ["weekend getaway", "bend", "high desert", "rock climbing"],
    inSeason: true,
    requiresWaiver: true,
    maximumGuests: 4,
    available: false,
    packagesSold: 0,
    notes: "The tour guide is currently recovering from a skiing accident.",
  }).save();

  res.cookie("test2", "value3", { signed: true });
  console.log(req.cookies);
  console.log(req.signedCookies.test2);
  // console.log(req.headers);
  res.render("newsletter-signup");
};
exports.newsletterProcess = (req, res) => {
  console.log(req.body);
  req.session.flash = {
    message: 123,
    type: "info",
  };
  res.redirect(303, "/newsletter-signup/thank-you");
};
exports.newsletterSuccess = (req, res) => res.render("newsletter-signup-thank-you");

exports.newsletterWithAjax = (req, res) => res.render("newsletter");
exports.api = {
  newsletterSuccess: (req, res) => {
    console.log(req.body);
    res.json({ result: `${req.body.name} was subscribed on ${req.body.email}` });
  },
  vacationPhotoContestError: (req, res, message) => {
    res.send({ result: "error", error: message });
  },
  vacationPhotoContest: (req, res, fields, files) => {
    console.log("field data: ", fields);
    console.log("files: ", files);
    res.send({ result: "success" });
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

exports.vacationPhotoContestAjax = (req, res) => {
  const date = new Date();
  res.render("contest/vacation-photo-ajax", { year: date.getFullYear(), month: date.getMonth() });
};

exports.listVacations = async (req, res) => {
  const vacations = await db.getVacations({ available: true });
  const currency = req.session.currency || "USD";
  res.render("vacation", {
    currency: currency,
    vacations: vacations.map(vacation => ({
      name: vacation.name,
      description: vacation.description,
      sku: vacation.sku,
      inSeason: vacation.inSeason,
      price: convertFromUSD(vacation.price, currency),
    })),
  });
};
function convertFromUSD(value, currency) {
  switch (currency) {
    case "USD":
      return value * 1;
    case "GBP":
      return value * 0.79;
    case "BTC":
      return value * 0.000078;
    default:
      return NaN;
  }
}

exports.notifyWhenInSeasonForm = (req, res) => res.render("notify-me-when-in-season", { sku: req.query.sku });

exports.notifyWhenInSeasonProcess = async (req, res) => {
  const { email, sku } = req.body;
  await db.addVacationInSeasonListener(email, sku);
  return res.redirect(303, "/vacations");
};

// note that this redirects to the /vacations page, but may
// want to use on // other pages!  should fix....
exports.setCurrency = (req, res) => {
  req.session.currency = req.params.currency;
  return res.redirect(303, "/vacations");
};
