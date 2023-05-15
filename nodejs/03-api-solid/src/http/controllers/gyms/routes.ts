import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { nearby } from "./nearby";
import { search } from "./search";
import { create } from "./create";
import { verifyUserRole } from "@/http/middlewares/only-admin";
// import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/nearby", nearby);
  app.get("/gyms/search", search);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] } ,create);
}
