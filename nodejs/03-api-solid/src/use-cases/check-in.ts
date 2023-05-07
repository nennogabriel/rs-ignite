import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credential-error";
import { compare } from "bcryptjs";
import { CheckInDTO } from "@/repositories/dtos/chek-in-dto";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckInDTO
}

export class CheckInUseCase {
  constructor(private readonly checkInRepository: CheckInsRepository) {}

  async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
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
