import { knex } from '@/database'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getEaterFromSessionId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!!sessionId) {
    const eater = await knex('eaters').where({ session_id: sessionId }).first()
    if (eater) {
      request.eater = {
        id: eater.id,
        name: eater.name,
        username: eater.username,
      }
    }
  }
}
