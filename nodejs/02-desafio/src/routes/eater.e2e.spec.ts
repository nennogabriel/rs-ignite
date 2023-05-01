import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { execSync } from 'node:child_process'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new user (eater)', async () => {
    await request(app.server)
      .post('/eaters')
      .send({
        name: 'Joaquim',
        username: 'joaquim',
      })
      .expect(201)
  })
})
