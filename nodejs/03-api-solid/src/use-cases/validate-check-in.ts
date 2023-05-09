import { CheckInDTO } from "@/repositories/dtos/chek-in-dto";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceInMetersBetweenCoordinates } from "@/utils/get-distance-in-meters-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-numbers-of-check-ins";
import dayjs from "dayjs";
import { LateCheckInValidateError } from "./errors/late-checkin-validate-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckInDTO
}

export class ValidateCheckInUseCase {
  constructor(
    private readonly checkInRepository: CheckInsRepository
  ) {}

  async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(dayjs(checkIn.created_at), 'minutes');

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError();
    }

    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn);

    return { checkIn };
  }
}
