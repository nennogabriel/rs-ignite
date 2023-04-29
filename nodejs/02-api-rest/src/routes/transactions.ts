import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    const transactions = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Teste de transação',
        amount: 100,
      })
      .returning('*')

    return { transactions }
  })
}
