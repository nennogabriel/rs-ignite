import { makeGetUserProfileUseCase } from '@/use-cases/factoriers/make-get-user-profile-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {

  const getUserProfileUseCase = makeGetUserProfileUseCase()
  const { user:userDB } = await getUserProfileUseCase.execute({ userId: request.user.sub })

  const { password_hash, ...user } = userDB

  return reply.status(200).send({ user })
}
