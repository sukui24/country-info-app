import { Repository } from "typeorm";

import { User } from "../models/User";

export class UserRepository {
  constructor(private readonly repository: Repository<User>) {
    //
  }

  public createUser() {
    const user = new User();
    return this.repository.save(user);
  }

  public get(id: number) {
    return this.repository.findOne({ where: { id } });
  }
}
