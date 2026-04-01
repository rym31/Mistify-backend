<<<<<<< HEAD:src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
=======
import { Injectable } from '@nestjs/common';
import {User} from '../users/user.entity';
import { Repository } from 'typeorm';
>>>>>>> 83a6d7bc20f4a6797f2c41d0fd7b8236f4decaf2:src/services/users.service.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(name: string, email: string, password: string) {
    const user = this.repo.create({name, email, password });
    return this.repo.save(user);
  }


  async findAllUsersByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async findAllUsers() {
    return this.repo.find();
  }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User n0t f0und....');
    }
    findOne(id: number) {
        return this.repo.findOneBy({id});
    }

<<<<<<< HEAD:src/users/users.service.ts
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User n0t f0und....');
    }

    return this.repo.remove(user);
  }

  async removeAllUsers() {
  const users = await this.repo.find();

  if (users.length === 0) {
    throw new NotFoundException('N0 users f0und');
  }

  return this.repo.remove(users);
}
}
=======
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


>>>>>>> 83a6d7bc20f4a6797f2c41d0fd7b8236f4decaf2:src/services/users.service.ts
