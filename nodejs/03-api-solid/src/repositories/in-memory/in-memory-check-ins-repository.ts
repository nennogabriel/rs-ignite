import { CheckInDTO, CreateCheckInDTO } from "../dtos/chek-in-dto";

export class InMemoryCheckInsRepository {
  public items: CheckInDTO[] = [];

  async create(data: CreateCheckInDTO){
    const checkIn = {
      id: String(this.items.length + 1),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date()  : null,
      created_at: new Date(),
    };
    this.items.push(checkIn);
    return checkIn;
  }


}
