import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Refresh Token (e2e)', async () => {

  beforeAll(async () => {
    await app.ready()
  }, 25000)

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
    const authResponse = await request(app.server).post('/sessions')
      .send({
        email: commonData.email,
        password: commonData.password
      })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server).patch('/token/refresh')
    .set('Cookie', cookies)
    .send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.get('Set-Cookie')).toEqual(expect.arrayContaining([
      expect.stringContaining('refreshToken=')
    ]))
  })
})
