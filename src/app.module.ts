import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema';
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from 'graphql-scalars';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { ProductsModule } from './products/products.module';
import { RecipesModule } from './recipes/recipes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './file-storage/upload.module';
import configuration from './config/configuration';



@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    RecipesModule,
    ProductsModule,
    UploadModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => { return upperDirectiveTransformer(schema, 'upper') },
      schema: makeExecutableSchema({
        typeDefs: [...scalarTypeDefs],
        resolvers: { ...scalarResolvers }
      }),
      installSubscriptionHandlers: true,
      typePaths: ['./**/*.graphql', './**/*.gql'],
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      csrfPrevention: true
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
})
export class AppModule { }
