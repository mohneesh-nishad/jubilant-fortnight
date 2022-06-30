import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewProductInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field((type) => ID, { nullable: false })
  recipeId: string;

  @Field((type) => [String])
  ingredients: string[];
}
