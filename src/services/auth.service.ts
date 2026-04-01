import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signin() {
        //1.Check if email is in use

        //2.hash the password

        //3.create a new user and save it

        //4. return the user
        return 'This action will sign in a user';
    }

    signup() {
        return 'This action will sign up a user';
    }
}
