import { expect, describe, it, beforeEach  } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { GetUserMetricsUseCase } from "./get-user-metrics"

let checkInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe("Get User Metrics Use Case",  () => {

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it("should be able to get check ins count from metrics ", async () => {
    await checkInRepository.create({
      gym_id: "1",
      user_id: "user-01",
    })

    await checkInRepository.create({
      gym_id: "2",
      user_id: "user-01",
    })

    const data = {
      userId: "user-01",
    }

    const { checkInsCount } = await sut.execute(data)

    expect(checkInsCount).toEqual(2)
  })
})


