import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { register } from "./register";
import { profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.get("/me", { onRequest: [verifyJWT] }, profile);
  app.patch("/token/refresh", refresh);
}
