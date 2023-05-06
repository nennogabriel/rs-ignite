import { CreateUserDTO } from "../dtos/user-dto";
import { UserDTO } from "../dtos/user-dto";

export class InMemoryUsersRepository {
  public items: UserDTO[] = [];

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(data: CreateUserDTO){
    const user = {
      id: String(this.items.length + 1),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };
    this.items.push(user);
    return user;
  }


}
