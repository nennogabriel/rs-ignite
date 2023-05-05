import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists"
import { RegisterUseCase } from "@/use-cases/register"
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
    const userRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(
      userRepository
    )
    await registerUseCase.execute({ name, email, password })
  }
  catch (error) {
    if (error instanceof UserAlreadyExists) {
      return reply.status(409).send()
    }
    throw error
  }

  return reply.status(201).send()
}