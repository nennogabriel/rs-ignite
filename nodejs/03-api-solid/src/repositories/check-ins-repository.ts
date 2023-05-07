import { CheckInDTO, CreateCheckInDTO } from "./dtos/chek-in-dto";

export interface CheckInsRepository {
  create: (data: CreateCheckInDTO) => Promise<CheckInDTO>;
  findManyByUserId: (userId: string, page: number) => Promise<CheckInDTO[]>;
  countByUserId: (userId: string) => Promise<number>;
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckInDTO | null>;
}
