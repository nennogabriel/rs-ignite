import { GymDTO } from "@/repositories/dtos/gyms-dto"
import { GymsRepository } from "@/repositories/gyms-repository"

interface SearchGymsUserCaseRequest {
  query: string
  page: number
}

interface SearchGymsUserCaseResponse {
  gyms: GymDTO[]
}

export class SearchGymsUserCase {
  constructor( private gymRepository: GymsRepository,){}

  async execute ({
    query, page,
  }: SearchGymsUserCaseRequest) : Promise<SearchGymsUserCaseResponse> {

    const gyms = await this.gymRepository.searchMany(query, page)

    return { gyms }
  }
}
