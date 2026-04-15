import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
} from '@nestjs/common';

import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { SigninDto } from '../dtos/signin.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { AdminGuard } from 'src/guards/admin.guards';

@Controller('auth')
export class UsersController {
  constructor(
    private service: UsersService,
    private authService: AuthService,
  ) {}

  @Get() // GET http://localhost:3000/auth
  getUsers() {
    return this.service.findAllUsers();
  }

  @Post('/signup') // POST http://localhost:3000/auth/signup
  async signup(@Body() body: CreateUserDto, @Session() session: any) {

    const user = await this.authService.signup(
      body.name,
      body.email,
      body.password,
    );

    // stocker le user dans la session
    session.userId = user.id;

    return user;
  }

  @Post('/signin') // POST http://localhost:3000/auth/signin
  async signin(@Body() body: SigninDto, @Session() session: any) {

    const user = await this.authService.signin(
      body.email,
      body.password,
    );

    // stocker le user dans la session
    session.userId = user.id;

    return user;
  }


  @Post('/signout') // POST http://localhost:3000/auth/signout
signout(@Session() session: any) {
  session.userId = null;
  return { message: 'tu est deco, by3...!' };
}

//pr savoir tes qui
@UseGuards(AuthGuard)
@Get('/whoami')
whoAmI(@Session() session: any) {
  return this.service.findOne(session.userId);
}

  @Patch('/:id')
  @UseGuards(AuthGuard,AdminGuard)
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.updateUser(parseInt(id), body);
  }

  @Get('/:id') // GET http://localhost:3000/auth/2
  @UseGuards(AuthGuard)
  getUser(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }


  
@UseGuards(AuthGuard, AdminGuard)
@Delete('/:id')
deleteUser(@Param('id') id: string) {
  return this.service.removeUser(parseInt(id));
}

  @Delete() // DELETE http://localhost:3000/auth
  @UseGuards(AuthGuard,AdminGuard)
  deleteAllUsers() {
    return this.service.removeAllUsers();
  }
}