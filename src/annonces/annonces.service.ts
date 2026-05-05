import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annonce } from './annonce.entity';
import { User } from '../users/user.entity';
import { Parfum } from '../parfums/parfum.entity';

@Injectable()
export class AnnoncesService {

  constructor(
    @InjectRepository(Annonce) private repo: Repository<Annonce>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Parfum) private parfumsRepo: Repository<Parfum>,
  ) {}

  async create(price: number, sellerId: number, parfumId: number, description?: string) {

    const seller = await this.usersRepo.findOne({ where: { id: sellerId } });
    if (!seller) throw new NotFoundException('seller N0T F0UND');

    const parfum = await this.parfumsRepo.findOne({ where: { id: parfumId } });
    if (!parfum) throw new NotFoundException('parfum N0T F0UND');

    const annonce = this.repo.create({
      price,
      description,
      seller,
      parfum,
    });

    return this.repo.save(annonce);
  }

  findAll() {
    return this.repo.find({ relations: ['seller', 'parfum'] });
  }

  // update()  {

  // }

  async remove(id: number) {
    const annonce = await this.repo.findOne({ where: { id } });
    if (!annonce) throw new NotFoundException('ANNONCE N0T F0UND');
    return this.repo.remove(annonce);
  }
}