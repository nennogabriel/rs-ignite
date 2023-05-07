import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "./check-in"

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe("Authenticate Use Case",  () => {

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })


  it("should be able to check in", async () => {
    vi.setSystemTime(new Date("2021-01-01 10:00:00"))
    const gymId = "gym-01"
    const userId = "user-01"

    const { checkIn } = await sut.execute({
      gymId,
      userId
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date("2021-01-01 10:00:00"))

    const gymId = "gym-01"
    const userId = "user-01"

    await sut.execute({
      gymId,
      userId
    })

    await expect(sut.execute({
      gymId,
      userId
    })).rejects.toBeInstanceOf(Error)
  })

  it("should be able to check in twice, but in different days", async () => {
    vi.setSystemTime(new Date("2021-01-01 10:00:00"))

    const gymId = "gym-01"
    const userId = "user-01"

    await sut.execute({
      gymId,
      userId
    })

    vi.setSystemTime(new Date("2021-01-02 10:00:00"))

    const { checkIn } = await sut.execute({
      gymId,
      userId
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})


