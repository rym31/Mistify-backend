import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commentaire } from './commentaire.entity';
import { User } from '../users/user.entity';
import { Parfum } from '../parfums/parfum.entity';

@Injectable()
export class CommentairesService {
  constructor(
    @InjectRepository(Commentaire) private readonly repo: Repository<Commentaire>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Parfum) private readonly parfumsRepo: Repository<Parfum>,
  ) {}

  async create(parfumId: number, userId: number, content: string, rating: number) {
    const parfum = await this.parfumsRepo.findOne({ where: { id: parfumId } });
    if (!parfum) throw new NotFoundException('Parfum N0T F0UND!');

    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User N0T F0UND!');

    const commentaire = this.repo.create({ content, rating, user, parfum });
    return this.repo.save(commentaire);
  }

  async findByParfum(parfumId: number) {
    return this.repo.find({
      where: { parfum: { id: parfumId } },
      relations: ['user', 'parfum'],
      order: { id: 'DESC' }, // POURRRR QUE CA SOIT + ORGANISEER REGARDE VIDEO YOURUBE LIKER!
    });
  }

  async update(id: number, attrs: Partial<Commentaire>) {
    const commentaire = await this.repo.findOne({ where: { id } });
    if (!commentaire) throw new NotFoundException('Commentaire N0T F0UND!');
    Object.assign(commentaire, attrs);
    return this.repo.save(commentaire);
  }

  async remove(id: number) {
    const commentaire = await this.repo.findOne({ where: { id } });
    if (!commentaire) throw new NotFoundException('Commentaire N0T F0UND!');
    return this.repo.remove(commentaire);
  }
}
