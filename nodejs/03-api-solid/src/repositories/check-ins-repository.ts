import { CheckInDTO, CreateCheckInDTO } from "./dtos/chek-in-dto";

export interface CheckInsRepository {
  create: (data: CreateCheckInDTO) => Promise<CheckInDTO>;
}
