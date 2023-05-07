import { Gym, Prisma } from "@prisma/client";


export interface GymDTO extends Gym {}

export interface CreateGymDTO extends Prisma.GymCreateInput {}
