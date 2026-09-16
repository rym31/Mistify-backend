import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieSession from 'cookie-session';
import { join } from 'path';

async function seedDatabase() {
  try {
    // seedParfums.js reste a la racine du projet (pas compile par nest build),
    // on le charge donc par chemin absolu plutot que par import relatif.
    const { seed } = require(join(process.cwd(), 'seedParfums.js'));
    await seed();
  } catch (err) {
    console.warn('Seed ignore au demarrage:', err.message);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Le schema est cree par TypeORM (synchronize: true) pendant NestFactory.create,
  // on peut donc seeder juste apres sans dependre d'un db.sqlite pre-rempli.
  await seedDatabase();

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();