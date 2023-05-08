import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymUseCase } from "./create-gym"
import { SearchGymsUserCase } from "./search-gyms"

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUserCase

describe("Search Gyms Use Case",  () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUserCase(gymsRepository)
  })

  it("should be search for gyms", async () => {
    await gymsRepository.create({
      title: "Gym 01",
      latitude: -20.66929,
      longitude: -40.49702
    })

    await gymsRepository.create({
      title: "Gym 02",
      latitude: -20.66929,
      longitude: -40.49703
    })

    const { gyms } = await sut.execute({
      query: "Gym",
      page: 1
    })

    expect(gyms.length).toEqual(2)
    expect(gyms[0].title).toEqual("Gym 01")
  })

  it("should be able to fetch paginated gyms", async () => {
    for (let i = 0; i < 23; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        latitude: -20.66929,
        longitude: -40.49702
      })
    }

    const { gyms } = await sut.execute({
      query: "Gym",
      page: 2
    })

    expect(gyms.length).toEqual(3)
    expect(gyms[0].title).toEqual("Gym 20")

  })
})


