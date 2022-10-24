const fs = require("fs/promises");
const path = require("path");
const express = require("express");

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

app.get("/", (req, res) => {
  getStaticContent(res, "../public/home.html");
});
app.get("/about/", (req, res) => {
  console.log(req.params);
  getStaticContent(res, "../public/about.html");
});
app.use((req, res) => {
  getStaticContent(res, "../public/404.html", 404);
});

app.listen(port, () => console.log(`server started on ${port}`));
