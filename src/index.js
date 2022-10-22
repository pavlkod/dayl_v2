const http = require("http");
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h2>test2</h2>");
});

server.listen(port, () => console.log(`server started on ${port}`));
