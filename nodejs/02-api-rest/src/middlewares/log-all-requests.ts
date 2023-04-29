import { FastifyReply, FastifyRequest } from 'fastify'

export async function logAllRequests(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log(`[${request.method}] ${request.url}`)
}
