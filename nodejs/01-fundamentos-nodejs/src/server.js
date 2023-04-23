import http from "node:http";

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write("Hello World!");
  response.end();
});

server.listen(3333, () => {
  console.log("Server on port 3333");
});
