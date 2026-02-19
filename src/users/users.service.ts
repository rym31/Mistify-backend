import { Injectable } from '@nestjs/common';
import {User} from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) {}
    create(email: string, password: string) {
        const user = this.repo.create({email, password});
        // return this.repo.save(user);

        return this.repo.create({email, password});
    }
    findOne(id: number) {
        return this.repo.findOneBy({id});
    }

    findAllUsers() {
        return this.repo.find();
    }

    async updateUser(id : number, attrs: Partial<User>) {
        const user = await this.repo.findOneBy({id});
        if (!user) {
            //Lancer une erreur not found
            return null;
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
}}
