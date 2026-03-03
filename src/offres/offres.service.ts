import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offre } from './offre.entity';
import { User } from '../users/user.entity';
import { Annonce } from '../annonces/annonce.entity';

@Injectable()
export class OffresService {
  constructor(
    @InjectRepository(Offre) private repo: Repository<Offre>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Annonce) private annoncesRepo: Repository<Annonce>,
  ) {}

  async create(annonceId: number, buyerId: number, amount: number) {
    const annonce = await this.annoncesRepo.findOne({
      where: { id: annonceId },
      relations: ['seller', 'parfum'],
    });
    if (!annonce) throw new NotFoundException('annonce N0T F0UND!');

    if (annonce.available === false) {
      throw new BadRequestException('ANNONCE PAS DISPONIBLE (TROP TARD?!)');
    }

    const buyer = await this.usersRepo.findOne({ where: { id: buyerId } });
    if (!buyer) throw new NotFoundException('Buyer N0T F0UND!');

    const offre = this.repo.create({
      amount,
      status: '3N ATteNte...',
      buyer,
      annonce,
    });

    return this.repo.save(offre);
  }

  findByAnnonce(annonceId: number) {
    return this.repo.find({
      where: { annonce: { id: annonceId } },
      relations: ['buyer', 'annonce', 'annonce.seller', 'annonce.parfum'],
      order: { id: 'DESC' },
    });
  }

  async accept(offreId: number) {
    const offre = await this.repo.findOne({
      where: { id: offreId },
      relations: ['annonce', 'buyer'],
    });
    if (!offre) throw new NotFoundException('0FFRE N0T F0UND!');

    // Marquer acceptée
    offre.status = 'accepter';

    // (optionnel) rendre l'annonce indisponible
    offre.annonce.available = false;

    await this.annoncesRepo.save(offre.annonce);
    return this.repo.save(offre);
  }

  async reject(offreId: number) {
    const offre = await this.repo.findOne({ where: { id: offreId } });
    if (!offre) throw new NotFoundException('0FFRE NON TROUVER (PEUT ETRE ELLE EST TROP NULL....)');

    offre.status = 'refuser!';
    return this.repo.save(offre);
  }
}