import { randomBytes, scrypt as _scrypt } from "crypto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signin(email: string, password: string) {
    // check if email is in use
    const users = await this.usersService.findAllUsersByEmail(email);

    if (users.length) {
      throw new BadRequestException("email in use");
    }

    // 2. hash the password
    // 2.1 generate salt
    const salt = randomBytes(8).toString("hex"); // 16 caractères de salt

    // 2.2 hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 2.3 join the hashed result and salt together in bd
    const result = salt + "." + hash.toString("hex");

    // 3. create new user

    // 4. return user
    return "this action will sign in a user";
  }

  singup() {
    return "this action will sign up a user";
  }
}