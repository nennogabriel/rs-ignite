import { expect, describe, it, beforeEach  } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history"

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe("Fetch User Check In History Use Case",  () => {

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  it("should be able to fetch check in history", async () => {
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
      page: 1,
    }

    const { checkIns } = await sut.execute(data)

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "1",
      }),
      expect.objectContaining({
        gym_id: "2",
      }),
    ])
  })

  it("should be able to fetch paginated check in history", async () => {
    for (let i = 0; i < 22; i++) {
      await checkInRepository.create({
        gym_id: `${i+1}`,
        user_id: "user-01",
      })
    }

    const data = {
      userId: "user-01",
      page: 2,
    }

    const { checkIns } = await sut.execute(data)

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "21",
      }),
      expect.objectContaining({
        gym_id: "22",
      }),
    ])
  })
})


