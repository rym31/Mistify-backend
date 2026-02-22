import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto} from '../dtos/update-user.dto'


@Controller('auth')
export class UsersController {

    constructor(private service : UsersService){}

        @Get() // GET http://localhost:3000/auth
        getUsers() {
            return this.service.findAllUsers();
        }
 
    @Post("/signup") //POST http://localhost:3000/auth/signup
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
        return this.service.create(body.email, body.password);
    }

    @Patch('/:id')
    updateUser(@Param('id') id : string, @Body() body : UpdateUserDto){
        return this.service.updateUser(parseInt(id),body);

    }
 
 
}