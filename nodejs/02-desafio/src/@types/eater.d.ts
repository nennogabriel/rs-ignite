import fastify from "fastify";
declare module 'fastify' {
    export interface FastifyRequest {
        eater: {
          id: string,
          name: string,
          username: string
        }
    }
}
