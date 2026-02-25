import { Body, Controller, Post, Get, Patch, Param, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
// import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

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

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto) 
    @Get("/:id")
    findUser(@Param("id") id: string) {
        console.log("handler is running");
        return this.service.findOne(parseInt(id));
    }

    @Get()
    findAllUsers() {
    return this.service.findAllUsers();
}

    
 
}