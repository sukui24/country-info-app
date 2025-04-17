import { UserRepository } from "../../database/repositories/UserRepository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {
    //
  }

  public async createUser() {
    return this.userRepository.createUser();
  }

  public async getUser(id: number) {
    return this.userRepository.get(id);
  }
}
