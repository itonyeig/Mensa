import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { AllExceptionsFilter } from './error/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger setup 
  const config = new DocumentBuilder()
  .setTitle("Mensa's API")
  .setDescription('User managements and posts. Geting all blogs can be accessed without authentication so anyone can view the blogs. All other routes are protected. Kindly login as the appropriate user type to access that route.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Remove any properties not included in the DTO
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  
  app.use(morgan('dev')); //Log routes
  app.enableCors({ origin: '*' });
  app.useGlobalFilters(new AllExceptionsFilter()); //Simple global error handler
  await app.listen(3000);
}
bootstrap();
