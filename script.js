

const http = require("http");
const url = require("url");

const server = http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  const num1 = parseInt(query.num1);
  const num2 = parseInt(query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid numbers provided" }));
    return;
  }
  let result;
  if (pathname === "/add") {
    result = num1 + num2;
  } else if (pathname === "/subtract") {
    result = num1 - num2;
  } else if (pathname === "/multiply") {
    result = num1 * num2;
  } else if (pathname === "/divide") {
    if (num2 === 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Cannot divide by zero" }));
    } else {
      result = num1 / num2;
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid endpoint" }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ result }));
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});



