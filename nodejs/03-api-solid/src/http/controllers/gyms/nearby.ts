import { makeFetchNearbyGymsUseCase } from "@/use-cases/factoriers/make-fetch-nearby-gyms-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function nearby (request: FastifyRequest, reply: FastifyReply) {
  const fetchNearbyGymBodySchema = z.object({
    latitude: z.number().refine(value => value >= -90 && value <= 90),
    longitude: z.number().refine(value => value >= -180 && value <= 180),
  })

  const { latitude, longitude } = fetchNearbyGymBodySchema.parse(request.body)

  const fetchNearbyGymUseCase = makeFetchNearbyGymsUseCase()
  const { gyms } = await fetchNearbyGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
   })

  return reply.status(200).send({ gyms })
}
