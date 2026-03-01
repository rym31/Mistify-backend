import { Body, Controller, Post, Get, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto} from '../dtos/update-user.dto'
import { AuthService } from 'src/auth.service';


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
        return this.service.create(body.name, body.email, body.password);
        // return this.AuthService.signup((body.name, body.email, body.password);
    }

    @Post("/signin") //POST http://localhost:3000/auth/signup
    // a faire !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



    

    @Patch('/:id')
    updateUser(@Param('id') id : string, @Body() body : UpdateUserDto){
        return this.service.updateUser(parseInt(id),body);

    }

    @Get('/:id') // GET http://localhost:3000/auth/2
    getUser(@Param('id') id: string) {
        return this.service.findOne(parseInt(id));
    }

    //FAIRE QUE SEULEMENT ADMIN!!!!!!!!!!!!!!!!
    @Delete('/:id') //DELETE http://localhost:3000/auth/2
    deleteUser(@Param('id') id: string) {
        return this.service.removeUser(parseInt(id));
  }

  @Delete() //DELETE http://localhost:3000/auth
deleteAllUsers() {
  return this.service.removeAllUsers();
}





    
 
 
}