import { expect, describe, it } from "vitest"
import { getDistanceInMetersBetweenCoordinates } from "./get-distance-in-meters-between-coordinates"


describe("Utils get distance in meters between coordinates",  () => {

  it("should have aproximataly 100m", async () => {
    const googleCoordinates1 = [-27.587361334781722, -48.55456258819925]
    const googleCoordinates2 = [-27.58707652576755, -48.5535985575756]
    const from = {
      latitude: googleCoordinates1[0],
      longitude: googleCoordinates1[1]
    }
    const to = {
      latitude: googleCoordinates2[0],
      longitude: googleCoordinates2[1]
    }
    const result  = getDistanceInMetersBetweenCoordinates(from, to)
    console.log(result)

    expect(result).toBeCloseTo(100, 0)
  })

  it("should have aproximataly 645m", async () => {
    const googleCoordinates1 = [-27.587986522706508, -48.554695828204146]
    const googleCoordinates2 = [-27.587785073653308, -48.54815139266958]
    const from = {
      latitude: googleCoordinates1[0],
      longitude: googleCoordinates1[1]
    }
    const to = {
      latitude: googleCoordinates2[0],
      longitude: googleCoordinates2[1]
    }
    const result  = getDistanceInMetersBetweenCoordinates(from, to)
    console.log(result)

    expect(result).toBeCloseTo(645, 0)
  })

  it("should have aproximataly 2732042m", async () => {
    const googleCoordinates1 = [-28.694745927136708, -49.36176875575561]
    const googleCoordinates2 = [-16.091470836819624, -72.26570408618795]
    const from = {
      latitude: googleCoordinates1[0],
      longitude: googleCoordinates1[1]
    }
    const to = {
      latitude: googleCoordinates2[0],
      longitude: googleCoordinates2[1]
    }
    const result  = getDistanceInMetersBetweenCoordinates(from, to)
    console.log(result)

    expect(result).toBeCloseTo(2732042, 0)
  })
})
