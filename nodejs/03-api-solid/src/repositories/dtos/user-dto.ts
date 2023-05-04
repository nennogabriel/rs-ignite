import { Prisma, User } from "@prisma/client";

export interface UserDTO extends User {}

export interface CreateUserDTO extends Prisma.UserCreateInput {}
