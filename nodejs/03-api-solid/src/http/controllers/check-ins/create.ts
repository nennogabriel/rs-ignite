import { makeCheckInUseCase } from "@/use-cases/factoriers/make-check-in-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => value >= -90 && value <= 90),
    longitude: z.number().refine(value => value >= -180 && value <= 180),
  })

  const { gymId } = createCheckInsParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const createCheckInUseCase = makeCheckInUseCase()
  await createCheckInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude
  })

  return reply.status(201).send()
}
