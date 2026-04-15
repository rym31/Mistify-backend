import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(name: string, email: string, password: string) {
    // 1. Check if email is in use
    const users = await this.usersService.findAllUsersByEmail(email);
    if (users.length) {
      throw new BadRequestException('email deja utiliser !!');
    }
    // 2. hash the password
    // 2.1 generate salt
    const salt = randomBytes(8).toString('hex');

    // 2.2 hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 2.3 join the hashed result and salt together in bd
    const result = salt + '.' + hash.toString('hex');

    // 3. create a new user and save it
    const user = await this.usersService.create(name, email, result);

    // 4. return the user
    return user;
  }

  async signin(email: string, password: string) {
    // 1. Check if email exists
    const users = await this.usersService.findAllUsersByEmail(email);
    if (!users.length) {
      throw new BadRequestException('information invalide, c pas toi ou quoi?!');
    }

    const user = users[0];

    // 2. compare passwords
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('nformation invalide, c pas toi ou quoi?!');
    }
    // 4. return the user
    return user;
  }
}