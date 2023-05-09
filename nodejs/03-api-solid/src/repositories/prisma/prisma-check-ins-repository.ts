import { prisma } from "@/lib/prisma"
import { CheckInsRepository } from "../check-ins-repository"
import { CreateCheckInDTO, CheckInDTO } from '../dtos/chek-in-dto'
import dayjs from "dayjs"

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }
  async create(data: CreateCheckInDTO) {
    const checkIn = await prisma.checkIn.create({ data })
    return checkIn
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return checkIns
  }
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
    return count
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("day").toDate()
    const endOfTheDay = dayjs(date).endOf("day").toDate()
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay,
          lt: endOfTheDay,
        },
      },
    })
    return checkIn
  }
  async save(checkIn: CheckInDTO) {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: {
        ...checkIn,
      },
    })
    return updatedCheckIn
  }
}
