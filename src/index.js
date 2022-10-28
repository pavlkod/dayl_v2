const fs = require("fs/promises");
const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");

const handlers = require("./handlers");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "../public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/", handlers.home);
app.get("/about/", (req, res) => {
  res.render("about");
});
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => console.log(`server started on ${port}`));
