import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Profile (e2e)', async () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const commonData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    }
    await request(app.server).post('/users').send(commonData)
    const authResponse = await request(app.server).post('/sessions')
      .send({
        email: commonData.email,
        password: commonData.password
      })

    const {token} = authResponse.body

    const profileResponse = await request(app.server).get('/me').set({
      Authorization: `Bearer ${token}`
    }).send()

    expect(profileResponse.status).toBe(200)
    expect(profileResponse.body.user).toEqual(expect.objectContaining({
      id: expect.any(String),
    }))
  })
})
