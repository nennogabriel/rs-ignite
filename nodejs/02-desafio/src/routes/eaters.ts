import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "@/database";


export async function eatersRoutes(app: FastifyInstance) {

  app.get('/', async () => {
    return { hello: 'world' }
  })

  app.post('/', async (request, reply) => {
    const createEaterSchema = z.object({
      name: z.string().min(1).max(255),
      username: z.string().min(1).max(50),
    })

    let sessionId = request.cookies.sessionId
    if (!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }


    const { name, username } = createEaterSchema.parse(request.body)

    const eater = await knex('eaters').insert({
      id: randomUUID(),
      name,
      username,
      session_id: sessionId,
    }).returning('*')

    // reply.headers
    return reply.status(201).send({eater})

  })

}
