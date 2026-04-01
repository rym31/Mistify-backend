<<<<<<< HEAD
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersService } from './users.service';
=======
import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
>>>>>>> 83a6d7bc20f4a6797f2c41d0fd7b8236f4decaf2
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from 'src/middleware/current-user.middleware'; 
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes('*'); // a toutes les routes!

  }

}