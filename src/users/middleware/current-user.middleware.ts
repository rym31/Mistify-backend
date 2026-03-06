import { Injectable, NestMiddleware } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

@Injectable()
export class CurentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: any, rest: any, next: () => void) {
    console.log(' test session ', req.session.userId);
    const { userId } = req.session.userId || {};
    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }
    next();
  }
}
