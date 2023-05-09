import { prisma } from "@/lib/prisma";
import { FindManyNearbyParams, GymsRepository } from "../../repositories/gyms-repository";
import { CreateGymDTO, GymDTO } from "../dtos/gyms-dto";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: CreateGymDTO) {
    const gym = await prisma.gym.create({ data });
    return gym;
  }
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });
    return gym;
  }
  async findManyNearby(params: FindManyNearbyParams) {
    const { latitude, longitude } = params;
    // get all gyms within 10000 meters
    const gyms = await prisma.$queryRaw<GymDTO[]>`
      SELECT * FROM gyms
      WHERE ST_Distance_Sphere( ST_MakePoint(${longitude}, ${latitude}), ST_MakePoint(longitude, latitude) ) <= 10000
    `;
    // const gyms = await prisma.$queryRaw<GymDTO[]>`
    //   SELECT * from gyms
    //   WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    // `;

    return gyms;
  }
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return gyms;
  }
}
