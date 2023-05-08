import { CheckInDTO, CreateCheckInDTO } from "./dtos/chek-in-dto";

export interface CheckInsRepository {
  create: (data: CreateCheckInDTO) => Promise<CheckInDTO>;
  findById: (id: string) => Promise<CheckInDTO | null>;
  findManyByUserId: (userId: string, page: number) => Promise<CheckInDTO[]>;
  countByUserId: (userId: string) => Promise<number>;
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckInDTO | null>;
  save: (checkIn: CheckInDTO) => Promise<CheckInDTO>;
}
