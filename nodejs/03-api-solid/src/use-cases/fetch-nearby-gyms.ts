import { GymDTO } from "@/repositories/dtos/gyms-dto"
import { GymsRepository } from "@/repositories/gyms-repository"

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: GymDTO[]
}

export class FetchNearbyGymsUseCase {
  constructor( private gymRepository: GymsRepository,){}

  async execute ({
    userLatitude, userLongitude,
  }: FetchNearbyGymsUseCaseRequest) : Promise<FetchNearbyGymsUseCaseResponse> {

    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return { gyms }
  }
}
