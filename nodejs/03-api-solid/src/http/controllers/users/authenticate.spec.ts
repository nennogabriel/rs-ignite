import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Authenticate (e2e)', async () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a user', async () => {
    const commonData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    }
    await request(app.server).post('/users')
      .send(commonData)
    const response = await request(app.server).post('/sessions')
      .send({
        email: commonData.email,
        password: commonData.password
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body.token).toEqual(expect.any(String))
  })
})
