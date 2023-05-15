import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credential-error"
import { makeAuthenticateUseCase } from "@/use-cases/factoriers/make-authenticate-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try{
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({ email, password })
    const token = await reply.jwtSign({
      role: user.role,
    }, {
      sign: {
        sub: user.id,
      }
    })
    const refreshToken = await reply.jwtSign({
      role: user.role,
     }, {
      sign: {
        sub: user.id,
        expiresIn: "7d"
      }
    })
    return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .send({ token })
  }
  catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message : error.message})
    }
    throw error
  }
}
