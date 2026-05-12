import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './services/auth.service';
import { CurrentUserMiddleware } from 'src/middleware/current-user.middleware';
import { UsersService } from './services/users.service';
import { FamilleOlfactives } from 'src/familleOlfactives/familleOlfactive.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, FamilleOlfactives])],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes('*');
  }
}
