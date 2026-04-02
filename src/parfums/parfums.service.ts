import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parfum } from './parfum.entity';

@Injectable()
export class ParfumsService {
  constructor(@InjectRepository(Parfum) private repo: Repository<Parfum>,
              @InjectRepository(DemandeParfum) private repoDemande: Repository<Demande>) {}

  create(attrs: Partial<Parfum>) {
    const parfum = this.repo.create(attrs);
    return this.repo.save(parfum);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, attrs: Partial<Parfum>) {
    const parfum = await this.repo.findOne({ where: { id } });
    if (!parfum) throw new NotFoundException('Parfum not found');
    Object.assign(parfum, attrs);
    return this.repo.save(parfum);
  }

  async remove(id: number) {
    const parfum = await this.repo.findOne({ where: { id } });
    if (!parfum) throw new NotFoundException('Parfum not found');
    return this.repo.remove(parfum);
  }

  async demande(attrs: Partial<Parfum>, name: string, ) {
    // find by name + tableaux de demandes -> valider
    
    const parfumName = await this.repo.findOne({where: { name }});
    if(!parfumName) {
      const parfum = this.repo.create(attrs);
      return await this.repo.save(parfum);
    }
  }

  validate(){

  }
}