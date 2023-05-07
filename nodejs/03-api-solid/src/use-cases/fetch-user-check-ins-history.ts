import { CheckInDTO } from "@/repositories/dtos/chek-in-dto";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckInDTO[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(
    private readonly checkInRepository: CheckInsRepository,
  ) {}

  async execute({ userId, page }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page);

    return { checkIns };
  }
}
