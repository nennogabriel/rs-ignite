import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "@/database";
import { checkSessionIdExists } from "@/middleware/check-session-id-exists";



export async function mealsRoutes(app: FastifyInstance) {

  app.addHook('preHandler', checkSessionIdExists)

  app.get('/', async () => {
    return { hello: 'world' }
  })

  app.post('/', async (request, reply) => {
    const createMealSchema = z.object({
      name: z.string().min(1).max(255),
      description: z.string().min(1),
      date: z.string().datetime(),
      is_on_diet: z.boolean(),
      eater_id: z.string().uuid(),
    })

    const { name, description, date, is_on_diet } = createMealSchema.parse(request.body)

    const {id: easterId} = request.eater

    const meal = await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      date,
      is_on_diet,
      eater_id: easterId,
    }).returning('*')
    return reply.status(201).send({meal})
  })

  app.put('/:id', async (request, reply) => {
    const changeMealParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const changeMealSchema = z.object({
      name: z.string().min(1).max(255),
      description: z.string().min(1),
      date: z.string().datetime(),
      is_on_diet: z.boolean(),
    })
    const { id } = changeMealParamsSchema.parse(request.params)

    const { name, description, date, is_on_diet } = changeMealSchema.parse(request.body)

    const {id: easterId} = request.eater

    // update meals data with same id
    const updatedMeal = await knex('meals')
      .where({
        id,
        eater_id: easterId,
      })
      .update({
        name,
        description,
        date,
        is_on_diet,
      })
      .returning('*')
    return reply.status(200).send({ meal: updatedMeal[0] })
  })

  app.delete('/:id', async (request, reply) => {
    const changeMealParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = changeMealParamsSchema.parse(request.params)
    const {id: easterId} = request.eater

    // delete meals data with same id
    await knex('meals')
      .where({
        id,
        eater_id: easterId,
      })
      .del()

    return reply.status(204).send()
  })
}
