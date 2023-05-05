import { expect, describe, it, beforeEach } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists"

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe("Register Use Case",  () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it("should hash user password upon registration", async () => {
    const { user } =await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    })

    const isPasswordCorrectlyHashed = await compare("123456", user.password_hash)

    expect(user.password_hash).not.toBe("123456")
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it("should not allow two users with the same email", async () => {
    const email = "johndoe@example.com"

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456"
    })

    await expect(sut.execute({
      name: "John Doe",
      email,
      password: "123456"
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it("should return the created user", async () => {

    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    })

    expect(user).toHaveProperty("id")
    expect(user).toHaveProperty("name", "John Doe")
  })
})


