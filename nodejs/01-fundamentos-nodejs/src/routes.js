import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: async (request, response) => {
      console.log("GET /users");
      console.log(request.query);
      console.log(request.params);
      const users = await database.select("users");
      return response.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const { name, email } = request.body;
      database.insert("users", {
        id: randomUUID(),
        name,
        email,
      });

      return response.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      const { name, email } = request.body;

      database.update("users", id, {
        name,
        email,
      });

      return response.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      database.delete("users", id);

      return response.writeHead(204).end();
    },
  },
];
