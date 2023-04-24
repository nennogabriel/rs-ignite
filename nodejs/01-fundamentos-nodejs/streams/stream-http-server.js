import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const result = number * -1;
    callback(null, Buffer.from(String(result)));
  }
}

const server = http.createServer((request, response) => {
  request.pipe(new InverseNumberStream()).pipe(response);
});

server.listen(3334, () => {
  console.log("Server on port 3334");
});
