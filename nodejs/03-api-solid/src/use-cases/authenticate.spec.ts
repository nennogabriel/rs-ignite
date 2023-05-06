import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "./errors/invalid-credential-error"

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe("Authenticate Use Case",  () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })


  it("should be able to authenticate", async () => {
    const email = "johndoe@example.com"
    const password = "123456"

    await usersRepository.create({
      name: "John Doe",
      email,
      password_hash: await hash(password, 6)
    })

    const { user } = await sut.execute({
      email,
      password
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should be able not able to authenticate with wrong email", async () => {
    const email = "johndoe@example.com"

    await expect(sut.execute({
        email,
        password: "any-password"
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should be able not able to authenticate with wrong password", async () => {
    const email = "johndoe@example.com"
    const password = "123456"

    await usersRepository.create({
      name: "John Doe",
      email,
      password_hash: await hash(password, 6)
    })


    await expect(sut.execute({
        email,
        password: "wrong-password"
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})


