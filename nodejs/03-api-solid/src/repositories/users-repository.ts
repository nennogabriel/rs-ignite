import { CreateUserDTO, UserDTO } from "./dtos/user-dto"

export interface UsersRepository {
  findById: (id: string) => Promise<UserDTO | null>
  findByEmail: (email: string) => Promise<UserDTO | null>
  create: (data: CreateUserDTO) => Promise<UserDTO>
}
