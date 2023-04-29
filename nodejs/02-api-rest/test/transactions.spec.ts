import { it, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transcation',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list the transactions', async () => {
    await request(app.server).get('/transactions').expect(200)
  })
})
