import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists"
import { makeRegisterUseCase } from "@/use-cases/factoriers/make-register-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try{

    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({ name, email, password })
  }
  catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send()
    }
    throw error
  }

  return reply.status(201).send()
}
