import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInDTO extends CheckIn {}

export interface CreateCheckInDTO extends Prisma.CheckInUncheckedCreateInput {}

