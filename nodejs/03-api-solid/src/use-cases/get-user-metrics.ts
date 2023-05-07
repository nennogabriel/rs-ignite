import { CheckInDTO } from "@/repositories/dtos/chek-in-dto";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(
    private readonly checkInRepository: CheckInsRepository,
  ) {}

  async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
