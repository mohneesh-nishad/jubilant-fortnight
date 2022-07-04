import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Recipe } from 'src/recipes/models/recipe.model';

@ObjectType({ description: 'products ' })
export class Product {
  @Field((type) => ID)
  id: string;

  @Directive('@upper')
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Recipe)
  recipe?: Recipe

  @Field({
    deprecationReason:'This will be removed in DB initialization.'
  })
  creationDate: Date;

  //   @Field((type) => [String])
  //   ingredients: string[];
}
