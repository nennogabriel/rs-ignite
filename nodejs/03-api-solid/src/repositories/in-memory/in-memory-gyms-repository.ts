import { CreateGymDTO, GymDTO } from "../dtos/gyms-dto";

export class InMemoryGymsRepository {
  public items: GymDTO[] = [];

  async findById(id: string) {
    const gym = this.items.find((gym) => gym.id === id);
    if (!gym) {
      return null;
    }
    return gym;
  }

  // async create(data: CreateGymDTO){
  //   const gym = {
  //     ...data,
  //     description: data.description || null,
  //     phone: data.phone || null,
  //     id: String(this.items.length + 1),
  //     created_at: new Date(),
  //   };

  //   this.items.push(gym);
  //   return gym;
  // }


}
