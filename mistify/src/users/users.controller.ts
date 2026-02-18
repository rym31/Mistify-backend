import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private service : UsersService) {}

    @Post('infoUser')
    createUserBody(@Body() body : any) {
        console.log(body);
    }
}
