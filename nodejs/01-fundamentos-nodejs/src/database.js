import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath)
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    }

    this.#database[table].push(data);

    this.#persist();
  }

  select(table, search) {
    let data = this.#database[table] ?? [];
    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value);
        });
      });
    }
    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((data) => data.id === id);
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...data,
      };
      this.#persist();
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((data) => data.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
