const fs = require("fs/promises");
const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");

const app = express();

const port = process.env.PORT || 3000;

const getStaticContent = (res, pathFile, status = 200, contentType = "text/html") => {
  fs.readFile(path.resolve(__dirname, pathFile))
    .then(data => {
      res.status(status);
      res.type(contentType);
      res.end(data);
    })
    .catch(err => {
      res.status(404);
      res.type("text/plain");
      res.end("err");
    });
};

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  // getStaticContent(res, "../public/home.html");
  res.render("home");
});
app.get("/about/", (req, res) => {
  // console.log(req.params);
  // getStaticContent(res, "../public/about.html");
  res.render("about");
});
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => console.log(`server started on ${port}`));
