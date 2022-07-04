import { Injectable } from "@nestjs/common";
import { createRandomUser } from "src/faker/personData";

@Injectable()
export class UserService {

  async getUser(id?: number) {
    return createRandomUser()
  }
}
