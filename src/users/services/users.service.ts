import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

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