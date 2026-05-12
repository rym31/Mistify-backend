import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, LessThanOrEqual } from 'typeorm';
import { Parfum } from './parfum.entity';
import { FamilleOlfactivesService } from 'src/familleOlfactives/familleOlfactives.service';

@Injectable()
export class ParfumsService {
  constructor(
    @InjectRepository(Parfum) private repo: Repository<Parfum>,
    private familleOlfactivesService: FamilleOlfactivesService,
  ) {}

  async create(attrs: Partial<Parfum>) {
    const parfum = this.repo.create(attrs);
    const saved = await this.repo.save(parfum);
    this.familleOlfactivesService.ajouterParfum(saved);
    return saved;
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

  async filterByGender(gender: string) {
    return this.repo.find({ where: { gender } });
  }

  async filterByYear(year: number) {
    return this.repo.find({ where: { year } });
  }

  async filterByFamily(family: string) {
    return this.repo.find({ where: { famille: { name: ILike(family) } } });
  }

  async filterByPrice(price: number){
    return this.repo.find({ where: { price } });
  }

  async filterCombined(gender?: string, family?: string, prixMax?: number) {
    const where: any = {};
    if (gender) where.gender = gender;
    if (family) where.famille = { name: ILike(family) };
    if (prixMax) where.price = LessThanOrEqual(prixMax);
    return this.repo.find({ where });
  }
}