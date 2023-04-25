import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import { getDataFromCsvFile } from "./utils/get-data-from-csv-file.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const { title, description } = request.body;
      const now = new Date();
      database.insert("tasks", {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: now,
        updated_at: now,
      });

      return response.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: async (request, response) => {
      const { search } = request.query;
      const tasks = await database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );
      return response.end(JSON.stringify(tasks));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      const { title, description } = request.body;

      database.update("tasks", id, {
        title,
        description,
      });

      return response.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      database.delete("tasks", id);

      return response.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (request, response) => {
      const { id } = request.params;
      database.complete("tasks", id);
      return response.writeHead(204).end();
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks/importCSV"),
    handler: async (request, response) => {
      const csvPath = new URL("../tasks.csv", import.meta.url);
      const csvRows = await getDataFromCsvFile(csvPath);
      csvRows.forEach((row) => {
        const { title, description } = row;
        const now = new Date();
        database.insert("tasks", {
          id: randomUUID(),
          title,
          description,
          completed_at: null,
          created_at: now,
          updated_at: now,
        });
      });

      response.writeHead(201).end();
    },
  },
];
