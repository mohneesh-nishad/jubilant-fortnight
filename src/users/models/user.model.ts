import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType({ description: 'Users' })
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  avatar?: string;

  @Field()
  password: string;

  @Field()
  birthdate: Date;

  @Field()
  registered_at: Date;
}