import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: async (request, response) => {
      const users = await database.select("users");
      return response.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: "/users",
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
];
