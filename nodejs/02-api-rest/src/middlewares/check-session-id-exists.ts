import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  let sessionId = request.cookies.sessionId

  if (!sessionId) {
    sessionId = randomUUID()
    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
  }
  if (!sessionId) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
}
