import { Prisma } from "@prisma/client";
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

  async searchMany(query: string, page: number) {
    const gyms = this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20);
    return gyms;
  }

  async create(data: CreateGymDTO){
    const gym = {
      id: String(this.items.length + 1),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

}
