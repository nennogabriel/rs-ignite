import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { GetUserProfileUseCase } from "./get-user-profile"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe("Get User Profile Use Case",  () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })


  it("should be able get user profile", async () => {
    const name = "John Doe"
    const email = "johndoe@example.com"
    const password = "123456"

    const createdUser = await usersRepository.create({
      name,
      email,
      password_hash: await hash(password, 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual(name)
  })

  it("should not be able to get a user with a wrong id", async () => {

    await expect(sut.execute({
      userId: "wrong-id",
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})


