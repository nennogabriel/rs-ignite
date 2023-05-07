import { CreateGymDTO, GymDTO } from "./dtos/gyms-dto";


export interface GymsRepository {
  findById: (id: string) => Promise<GymDTO | null>
  create: (data: CreateGymDTO) => Promise<GymDTO>
}
