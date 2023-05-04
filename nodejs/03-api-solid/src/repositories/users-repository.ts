import { CreateUserDTO, UserDTO } from "./dtos/user-dto"

export interface UsersRepository {
  create: (data: CreateUserDTO) => Promise<UserDTO>
  findByEmail: (email: string) => Promise<UserDTO | null>
}
