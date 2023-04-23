import http from "node:http";

const users = [];

const server = http.createServer((request, response) => {
  const { url, method } = request;

  if (method === "GET" && url === "/users") {
    return response.setHeader("Content-Type", "application/json").end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    });

    return response.writeHead(201).end();
  }

  response.writeHead(404).end();
});

server.listen(3333, () => {
  console.log("Server on port 3333");
});
