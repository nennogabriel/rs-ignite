import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

describe('App Routes', () => {

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

  describe('Eaters Routes', () => {

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

  describe('Meals Routes', () => {

    it('should be able to register a meal', async () => {
      const createEaterResponse = await request(app.server)
        .post('/eaters')
        .send({
          name: 'Joaquim',
          username: 'joaquim',
        })

      const cookies = createEaterResponse.headers['set-cookie']
      const eater = createEaterResponse.body.eater[0]


      const createMealResponse = await request(app.server)
        .post('/meals')
        .set('Cookie', cookies)
        .send({
          id: randomUUID(),
          name: 'Big Mac',
          description: 'Dois hamburgueres, alface, queijo, molho especial, cebola e picles num pão com gergelim.',
          date: new Date().toISOString(),
          is_on_diet: false,
          eater_id: eater.id,
        })
        .expect(201)
    })

    it('should be able to update a meal', async () => {
      const createEaterResponse = await request(app.server)
        .post('/eaters')
        .send({
          name: 'Joaquim',
          username: 'joaquim',
        })

      const cookies = createEaterResponse.headers['set-cookie']
      const eater = createEaterResponse.body.eater[0]
      const mealUUID = randomUUID()

      const createMealResponse = await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        id: mealUUID,
        name: 'Big Mac',
        description: 'Dois hamburgueres, alface, queijo, molho especial, cebola e picles num pão com gergelim.',
        date: new Date().toISOString(),
        is_on_diet: false,
        eater_id: eater.id,
      })


      const changeMealResponse = await request(app.server)
        .put(`/meals/${mealUUID}`)
        .set('Cookie', cookies)
        .send({
          name: 'Salada',
          description: 'alface, tomate e molho especial',
          date: new Date().toISOString(),
          is_on_diet: true,
        })

        expect(changeMealResponse.body.meal).toEqual(
          expect.objectContaining({
            name: 'Salada',
            description: 'alface, tomate e molho especial',
            is_on_diet: true,
          })
        )

    })
  })
})
