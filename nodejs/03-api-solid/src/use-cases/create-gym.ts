import { GymDTO } from "@/repositories/dtos/gyms-dto"
import { GymsRepository } from "@/repositories/gyms-repository"

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: GymDTO
}

export class CreateGymUseCase {
  constructor( private gymRepository: GymsRepository,){}

  async execute ({
    title, description, phone, latitude, longitude,
  }: CreateGymUseCaseRequest) : Promise<CreateGymUseCaseResponse> {

    const gym = await this.gymRepository.create({
      title, description, phone, latitude, longitude,
    })

    return { gym }
  }
}
