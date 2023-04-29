import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkSessionIdExists)
  app.get('/', async (request) => {
    const { sessionId } = request.cookies

    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select()

    return { transactions }
  })

  app.get('/:id', async (request) => {
    const getTransactionSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionSchema.parse(request.params)
    const { sessionId } = request.cookies
    const transaction = await knex('transactions')
      .where({
        id,
        session_id: sessionId,
      })
      .first()
    return { transaction }
  })

  app.get(`/summary`, async (request) => {
    const { sessionId } = request.cookies

    const summary = await knex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()

    return {
      summary,
    }
  })

  app.post('/', async (request, reply) => {
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    const sessionId = request.cookies.sessionId

    const { title, amount, type } = createTransactionSchema.parse(request.body)

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'debit' ? -amount : amount,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
