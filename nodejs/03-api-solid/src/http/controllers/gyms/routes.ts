import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}
