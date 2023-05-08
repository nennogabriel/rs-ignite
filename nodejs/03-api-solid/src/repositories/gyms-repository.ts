import { CreateGymDTO, GymDTO } from "./dtos/gyms-dto";

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  create: (data: CreateGymDTO) => Promise<GymDTO>
  findById: (id: string) => Promise<GymDTO | null>
  findManyNearby: (params: FindManyNearbyParams) => Promise<GymDTO[]>
  searchMany: (query: string, page: number) => Promise<GymDTO[]>
}
