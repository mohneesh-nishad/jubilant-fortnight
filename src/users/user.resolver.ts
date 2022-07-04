import { NotFoundException } from "@nestjs/common";
import { Args, Int, Resolver, Query } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) { }

  @Query()
  async get_user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

}