import { expect, describe, it, beforeEach } from "vitest"
import { compare } from "bcryptjs"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymUseCase } from "./create-gym"

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe("Register Use Case",  () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it("should be able to create gym", async () => {

    const { gym } = await sut.execute({
      title: "Gym 01",
      description: null,
      phone: null,
      latitude: -20.66929,
      longitude: -40.49702
    })

    expect(gym.id).toEqual(expect.any(String))
  })

})


