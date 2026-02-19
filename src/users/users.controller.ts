import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('auth')
export class UsersController {

    constructor(private service : UsersService){}

    // @Get()
    // getUsers() {
    //     return this.service.findAll();
    // }
 
    @Post("/signup")
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
        return this.service.create(body.email, body.password);
    }
 
 
}