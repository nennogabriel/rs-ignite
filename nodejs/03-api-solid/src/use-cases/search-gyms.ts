import { GymDTO } from "@/repositories/dtos/gyms-dto"
import { GymsRepository } from "@/repositories/gyms-repository"

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: GymDTO[]
}

export class SearchGymsUseCase {
  constructor( private gymRepository: GymsRepository,){}

  async execute ({
    query, page,
  }: SearchGymsUseCaseRequest) : Promise<SearchGymsUseCaseResponse> {

    const gyms = await this.gymRepository.searchMany(query, page)

    return { gyms }
  }
}
