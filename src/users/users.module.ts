import { Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurentUserMiddleware } from './middleware/current-user.middleware';
import { MiddlewareConsumer } from '@nestjs/common';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // providers: [UsersService, AuthService, CurrentUserInterceptor],
  controllers: [UsersController],
  providers: [UsersService, AuthService,
    // , {
  //   provide: 'APP_INTERCEPTOR',
  //   useClass: CurrentUserInterceptor
  // }, AuthGuard]
 
  ],
})
export class UsersModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurentUserMiddleware).forRoutes('*');
  }
}