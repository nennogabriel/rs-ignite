import dayjs from "dayjs";
import { CheckInDTO, CreateCheckInDTO } from "../dtos/chek-in-dto";

export class InMemoryCheckInsRepository {
  public items: CheckInDTO[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date")
    const endOfTheDay = dayjs(date).endOf("date")

    const checkIn = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDay = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDay
    });
    if (!checkIn) {
      return null;
    }
    return checkIn;
  }

  async countByUserId(userId: string) {
    const checkIns = this.items.filter((checkIn) => checkIn.user_id === userId);
    return checkIns.length;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items.filter((checkIn) => checkIn.user_id === userId)
    .slice((page - 1) * 20, page * 20);

    return checkIns;
  }

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
