import { CheckInDTO } from "@/repositories/dtos/chek-in-dto";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckInDTO
}

export class CheckInUseCase {
  constructor(
    private readonly checkInRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository
  ) {}

  async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date());

    if (checkInOnSameDay) {
      throw new Error("User already checked in today");
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId
    });



    return { checkIn };
  }
}
