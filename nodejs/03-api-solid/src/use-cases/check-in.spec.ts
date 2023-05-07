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
      latitude: new Decimal(-20.66929),
      longitude: new Decimal(-40.49702),
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
      userLatitude: -20.66929,
      userLongitude: -40.49702
    }

    const { checkIn } = await sut.execute(data)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date("2021-01-01 10:00:00"))

    const data = {
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -20.66929,
      userLongitude: -40.49702
    }

    await sut.execute(data)

    await expect(sut.execute(data)).rejects.toBeInstanceOf(Error)
  })

  it("should be able to check in twice, but in different days", async () => {
    vi.setSystemTime(new Date("2021-01-01 10:00:00"))

    const data = {
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -20.66929,
      userLongitude: -40.49702
    }

    await sut.execute(data)

    vi.setSystemTime(new Date("2021-01-02 10:00:00"))

    const { checkIn } = await sut.execute(data)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should be not be able to check in to distant gym", async () => {
    vi.setSystemTime(new Date("2021-01-01 10:00:00"))

    gymsRepository.items.push({
      id: "gym-02",
      title: "Gym 02",
      description: "",
      phone: "",
      latitude: new Decimal(-20.65175),
      longitude: new Decimal(-40.47717),
    })

    const data = {
      gymId: "gym-02",
      userId: "user-01",
      userLatitude: -20.66929,
      userLongitude: -40.49702
    }

    await expect(sut.execute(data)).rejects.toBeInstanceOf(Error)
  })
})


