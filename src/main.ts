import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { contentParser } from 'fastify-multer';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';


const swaggerDocument = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API')
  .setVersion('1.0')
  .addTag('API')
  .build();

const swagger_options: SwaggerDocumentOptions = {
  operationIdFactory: (
    controllerKey: string,
    methodKey: string
  ) => methodKey,
};
const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'My API Docs',
};


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.register(contentParser)
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swaggerDocument, swagger_options),
  );

  const port = 6342
  app.listen(port, '0.0.0.0', function (error, address) {
    if(error){
      console.log(error);
      process.exit(1);
    }
    console.log(`Application is running on: ${address}/graphql`);
  });
}
bootstrap();
