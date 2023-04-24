import http from "node:http";
import { json } from "./middleares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (request, response) => {
  const { url, method } = request;

  await json(request, response, () => {});

  const route = routes.find((r) => {
    return r.method === method && r.path === url;
  });

  if (route) {
    return route.handler(request, response);
  }

  response.writeHead(404).end();
});

server.listen(3333, () => {
  console.log("Server on port 3333");
});
