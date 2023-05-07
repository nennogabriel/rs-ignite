import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "./check-in"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/library"

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("Authenticate Use Case",  () => {

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    gymsRepository.items.push({
      id: "gym-01",
      title: "Gym 01",
      description: "",
      phone: "",
      latitude: new Decimal(10),
      longitude: new Decimal(10),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })


  it("should be able to check in", async () => {
    vi.setSystemTime(new Date("2021-01-01 10:00:00"))
    const data = {
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 10,
      userLongitude: 10
    }

    const { checkIn } = await sut.execute(data)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date("2021-01-01 10:00:00"))

    const data = {
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 10,
      userLongitude: 10
    }

    await sut.execute(data)

    await expect(sut.execute(data)).rejects.toBeInstanceOf(Error)
  })

  it("should be able to check in twice, but in different days", async () => {
    vi.setSystemTime(new Date("2021-01-01 10:00:00"))

    const data = {
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 10,
      userLongitude: 10
    }

    await sut.execute(data)

    vi.setSystemTime(new Date("2021-01-02 10:00:00"))

    const { checkIn } = await sut.execute(data)

    expect(checkIn.id).toEqual(expect.any(String))
  })
})


