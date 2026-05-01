import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parfum } from '../parfums/parfum.entity';
import { User } from '../users/user.entity';
import { Panier } from './panier.entity';

@Injectable()
export class PanierService {
  constructor(
    @InjectRepository(Panier) private repo: Repository<Panier>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Parfum) private parfumsRepo: Repository<Parfum>,
  ) {}

  async voirPanier(userId: number) {
    const panier = await this.repo.find({
      where: { user: { id: userId } },
      relations: ['parfum'],
      order: { id: 'ASC' },
    });

    return panier.map((ligne) => ({
      id: ligne.parfum.id,
      name: ligne.parfum.name,
      brand: ligne.parfum.brand,
      description: ligne.parfum.description,
      imageUrl: ligne.parfum.imageUrl,
      price: ligne.parfum.price,
      quantite: ligne.quantite,
    }));
  }

  async ajouter(userId: number, parfumId: number, quantite = 1) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Utilisateur introuvable');

    const parfum = await this.parfumsRepo.findOne({ where: { id: parfumId } });
    if (!parfum) throw new NotFoundException('Parfum introuvable');

    let ligne = await this.repo.findOne({
      where: { user: { id: userId }, parfum: { id: parfumId } },
      relations: ['user', 'parfum'],
    });

    if (ligne) {
      ligne.quantite += quantite;
    } else {
      ligne = this.repo.create({ user, parfum, quantite });
    }

    if (ligne.quantite < 1) ligne.quantite = 1;

    await this.repo.save(ligne);
    return this.voirPanier(userId);
  }

  async modifierQuantite(userId: number, parfumId: number, quantite: number) {
    const ligne = await this.repo.findOne({
      where: { user: { id: userId }, parfum: { id: parfumId } },
    });

    if (!ligne)
      throw new NotFoundException('Article introuvable dans le panier');

    if (quantite <= 0) {
      await this.repo.remove(ligne);
      return this.voirPanier(userId);
    }

    ligne.quantite = quantite;
    await this.repo.save(ligne);
    return this.voirPanier(userId);
  }

  async supprimer(userId: number, parfumId: number) {
    const ligne = await this.repo.findOne({
      where: { user: { id: userId }, parfum: { id: parfumId } },
    });

    if (ligne) {
      await this.repo.remove(ligne);
    }

    return this.voirPanier(userId);
  }

  async vider(userId: number) {
    const panier = await this.repo.find({
      where: { user: { id: userId } },
    });

    if (panier.length > 0) {
      await this.repo.remove(panier);
    }

    return [];
  }
}
