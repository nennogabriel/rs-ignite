import { CheckInDTO } from "@/repositories/dtos/chek-in-dto";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceInMetersBetweenCoordinates } from "@/utils/get-distance-in-meters-between-coordinates";

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

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceInMetersBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const MAX_DISTANCE_IN_METERS = 100;

    if (distance > MAX_DISTANCE_IN_METERS) {
      throw new Error("User is too far from gym");
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
