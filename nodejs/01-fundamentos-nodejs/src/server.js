import http from "node:http";

const server = http.createServer((request, response) => {
  const { url, method } = request;

  if (method === "GET" && url === "/users") {
    return response.end("listagem de usuários");
  }

  if (method === "POST" && url === "/users") {
    return response.end("criando um usuário");
  }

  response.end("Hello World!");
});

server.listen(3333, () => {
  console.log("Server on port 3333");
});
