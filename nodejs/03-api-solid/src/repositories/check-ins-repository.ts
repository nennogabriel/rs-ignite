import { CheckInDTO, CreateCheckInDTO } from "./dtos/chek-in-dto";

export interface CheckInsRepository {
  create: (data: CreateCheckInDTO) => Promise<CheckInDTO>;
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckInDTO | null>;
}
