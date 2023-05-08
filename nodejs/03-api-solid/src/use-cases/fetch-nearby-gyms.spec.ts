import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms"

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe("Fetch Nearby Gyms Use Case",  () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it("should be fetch nearby gyms", async () => {
    const googleCoordinates1 = [-27.58831439592556, -48.55640596443768]
    await gymsRepository.create({
      title: "Gym de perto 01",
      latitude: googleCoordinates1[0],
      longitude: googleCoordinates1[1]
    })

    const googleCoordinates2 = [-27.43901505946427, -48.49837732561437]
    await gymsRepository.create({
      title: "Gym churêrê 02",
      latitude: googleCoordinates2[0],
      longitude: googleCoordinates2[1]
    })

    const { gyms } = await sut.execute({
      userLatitude: googleCoordinates1[0],
      userLongitude: googleCoordinates1[1]
    })

    expect(gyms.length).toEqual(1)
    expect(gyms[0].title).toEqual("Gym de perto 01")
  })

})


