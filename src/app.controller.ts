import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
<<<<<<< HEAD
  getHello(): any {
    throw new Error('Method not implemented.');
  }
=======
  constructor(private appService: AppService) {}
>>>>>>> 83a6d7bc20f4a6797f2c41d0fd7b8236f4decaf2

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
