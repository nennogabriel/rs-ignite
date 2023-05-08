import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { ValidateCheckInUseCase } from "./validate-check-in"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

let checkInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe("Validate Check In Use Case",  () => {

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })


  it("should be able to validate check-in", async () => {
    // vi.setSystemTime(new Date("2021-01-01 10:00:00"))

    const createdCheckIn = await checkInRepository.create({
      gym_id: "1",
      user_id: "user-01",
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it("should not be able to validate an inexistent check-in", async () => {
    // vi.setSystemTime(new Date("2021-01-01 10:00:00"))

    const createdCheckIn = await checkInRepository.create({
      gym_id: "1",
      user_id: "user-01",
    })

    await expect(sut.execute({
      checkInId: "inexistent-check-in-id",
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })


})


