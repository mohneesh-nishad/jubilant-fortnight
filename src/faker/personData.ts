import { faker } from "@faker-js/faker";
import { User } from "src/users/models/user.model";

export function createRandomUser(): User {
  return {
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registered_at: faker.date.past(),
  };
}