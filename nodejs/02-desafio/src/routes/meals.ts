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

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      date,
      is_on_diet,
      eater_id: easterId,
    })
    return reply.status(201).send()
  })

  app.put('/:id', async (request, reply) => {
    const changeMealParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const changeMealSchema = z.object({
      name: z.string().min(1).max(255),
      description: z.string().min(1),
      is_on_diet: z.boolean(),
    })
    const { id } = changeMealParamsSchema.parse(request.params)

    const { name, description, is_on_diet } = changeMealSchema.parse(request.body)

    const {id: easterId} = request.eater

    // update meals data with same id
    const updatedMeal = await knex('meals')
      .where({
        id,
      })
      .update({
        name,
        description,
        is_on_diet,
      })
      .returning('*')

    console.log("🚀 ~ file: meals.ts:65 ~ app.put ~ updatedMeal:", updatedMeal)
    return reply.status(20).send({meal: {
      name,
      description,
      is_on_diet,
    }})

    // await knex('meals').insert({
    //   id: randomUUID(),
    //   name,
    //   description,
    //   date,
    //   is_on_diet,
    //   eater_id: easterId,
    // })
    // return reply.status(201).send()
  })
}
