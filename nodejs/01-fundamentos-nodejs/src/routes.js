import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: (request, response) => {
      return response.setHeader("Content-Type", "application/json").end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: (request, response) => {
      const { name, email } = request.body;
      users.push({
        id: randomUUID(),
        name,
        email,
      });

      return response.writeHead(201).end();
    },
  },
];
