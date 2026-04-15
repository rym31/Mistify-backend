import { Controller, Get } from '@nestjs/common';
<<<<<<< HEAD
import { AppService } from './app.service';
=======
import { UsersService } from './users/services/users.service';
>>>>>>> dee21a8a646b9d51b06cc18cd1d0de6be3a2caaa

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
