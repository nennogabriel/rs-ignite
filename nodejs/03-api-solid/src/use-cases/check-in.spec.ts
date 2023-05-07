import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "./check-in"

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe("Authenticate Use Case",  () => {

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)
  })


  it("should be able to check in", async () => {
    const gymId = "gym-id"
    const userId = "user-id"

    const { checkIn } = await sut.execute({
      gymId,
      userId
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

})


