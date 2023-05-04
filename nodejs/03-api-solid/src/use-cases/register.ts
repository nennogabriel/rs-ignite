import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor( private userRepository: any,){}

  async execute ({
    name, email, password,
  }: RegisterUseCaseRequest) {

    const password_hash = await hash(password, 2)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })


    if (userWithSameEmail) {
      throw new Error('User already exists')
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
