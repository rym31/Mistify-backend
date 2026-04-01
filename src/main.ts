import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { ValidationPipe } from '@nestjs/common';
import cookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(
    cookieSession({
      keys: ['super-secret-key'], //??????????
    }),
  );

  //POUR FRONTEND
    app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

=======
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';
// import {Reflector} from '@nestjs/core';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true ,
    forbidNonWhitelisted: true,
    transform: true
    

  }));
  // app.useGlobalInterceptors(
  //   new ClassSerializerInterceptor(app.get(Reflector))
  // )
>>>>>>> 83a6d7bc20f4a6797f2c41d0fd7b8236f4decaf2
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();