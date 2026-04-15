import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
<<<<<<< HEAD
import { UsersService } from '../services/users.service';
=======
import { UsersService } from './services/users.service';
>>>>>>> dee21a8a646b9d51b06cc18cd1d0de6be3a2caaa
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './services/auth.service';
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