import http from "node:http";
import { json } from "./middleares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (request, response) => {
  const { url, method } = request;

  await json(request, response, () => {});

  const route = routes.find((r) => {
    return r.method === method && r.path.test(url);
  });

  if (route) {
    const routeParams = route.path.exec(url);
    const { query, ...params } = routeParams.groups;
    request.params = params;
    request.query = query ? extractQueryParams(query) : {};
    return route.handler(request, response);
  }

  response.writeHead(404).end();
});

server.listen(3333, () => {
  console.log("Server on port 3333");
});
