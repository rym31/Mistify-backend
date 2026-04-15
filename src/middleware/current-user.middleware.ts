import { Injectable, NestMiddleware } from '@nestjs/common';
<<<<<<< HEAD
import { UsersService } from 'src/services/users.service';
=======
import { UsersService } from 'src/users/services/users.service';
>>>>>>> dee21a8a646b9d51b06cc18cd1d0de6be3a2caaa

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: any, res: any, next: () => void) {
    const userId = req.session?.userId;
    console.log('session userId =', userId);
    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }
    next();
  }

}