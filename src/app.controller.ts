import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users/services/users.service';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }

}
