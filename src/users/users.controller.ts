import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private service : UsersService){}

        @Get()
        getUsers() {
            return this.service.findAllUsers();
        }
 
    @Post("/signup")
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
        return this.service.create(body.email, body.password);
    }

    @Patch("/:id")
    updateUser(@Param("id") id: string, @Body() body: Partial<CreateUserDto>) {
        return this.service.updateUser(parseInt(id), body);
    }

    
 
}