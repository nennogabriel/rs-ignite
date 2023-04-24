import http from "node:http";
import { json } from "./middleares/json.js";
import { Database } from "./database.js";

const database = new Database();

const server = http.createServer(async (request, response) => {
  const { url, method } = request;

  await json(request, response, () => {});

  if (method === "GET" && url === "/users") {
    return response.setHeader("Content-Type", "application/json").end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body;
    users.push({
      id: 1,
      name,
      email,
    });

    return response.writeHead(201).end();
  }

  response.writeHead(404).end();
});

server.listen(3333, () => {
  console.log("Server on port 3333");
});
