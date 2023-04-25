import fs from "node:fs";
import { parse } from "csv-parse";

export async function getDataFromCsvFile(filePath) {
  // read the CSV file into a buffer and then parse it into an array of objects using the csv-parse package

  const csv = fs.ReadStream(filePath).pipe(parse({ columns: true, trim: true, delimiter: "," }));

  const data = [];

  for await (const row of csv) {
    data.push(row);
  }

  return data;
}
