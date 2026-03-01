import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { scrypt } from 'crypto';

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

  async findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async findAllUsers() {
    return this.repo.find();
  }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }

  async removeAllUsers() {
  const users = await this.repo.find();

  if (users.length === 0) {
    throw new NotFoundException('No users found');
  }

  return this.repo.remove(users);
}


async signIn(Email: string, password : string){
  //1;find user by email
  const [user] = await this.userService.findAllUsersBtEmail(Email);
  //1.2 if user notfound ,throw wrror 
  if(!user){
    throw new NotFoundException("pas de user ! trouver")
  }
  //2. retrieve the salt and hash from tge storef passrwrod
  const [salt, storedHash] = user.password.split('.');

  //3. hash de the supplied password with the salt 
  const hash = (await scrypt(password, salt, 32)) as Buffer;

  //4 compare the hashed reslt with the stored hash
  if (hash.toString('hex') !== storedHash ) {
    throw new BadRequestException ("mauvais pswd...")

  }
  return user;

}
}