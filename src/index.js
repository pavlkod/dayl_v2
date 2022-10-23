const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

const getStaticContent = (res, pathFile, contentType = "text/html", status = 200) => {
  const file = fs.readFile(path.resolve(__dirname, pathFile), (err, data) => {
    console.log(`${__dirname}${path}`);
    if (err) {
      res.writeHead(404, {
        "Content-type": "text/plain",
      });
      return res.end("Error");
    }
    res.writeHead(status, {
      "Content-type": contentType,
    });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/about":
      getStaticContent(res, "../public/about.html");
      break;
    case "/":
      getStaticContent(res, "../public/home.html");
      break;
    default:
      getStaticContent(res, "../public/404.html", "text/html", 404);
      break;
  }
});

server.listen(port, () => console.log(`server started on ${port}`));
