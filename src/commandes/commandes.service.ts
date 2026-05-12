import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parfum } from '../parfums/parfum.entity';
import { User } from '../users/user.entity';
import { CommandeItem } from './commande-item.entity';
import { Commande } from './commande.entity';

@Injectable()
export class CommandesService {
  constructor(
    @InjectRepository(Commande) private commandeRepo: Repository<Commande>,
    @InjectRepository(CommandeItem) private itemRepo: Repository<CommandeItem>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Parfum) private parfumsRepo: Repository<Parfum>,
  ) {}

  async creer(userId: number, items: { id: number; quantite: number }[], total: number) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Utilisateur introuvable');

    const commande = this.commandeRepo.create({ user, total });
    const commandeSauvegardee = await this.commandeRepo.save(commande);

    for (const item of items) {
      const parfum = await this.parfumsRepo.findOne({ where: { id: item.id } });
      if (!parfum) continue;

      const ligne = this.itemRepo.create({
        commande: commandeSauvegardee,
        parfum,
        quantite: item.quantite,
      });
      await this.itemRepo.save(ligne);
    }

    return this.commandeRepo.findOne({
      where: { id: commandeSauvegardee.id },
      relations: ['items', 'items.parfum'],
    });
  }

  async mesCommandes(userId: number) {
    const commandes = await this.commandeRepo.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.parfum'],
      order: { createdAt: 'DESC' },
    });

    return commandes.map((commande) => ({
      id: commande.id,
      total: commande.total,
      statut: commande.statut,
      createdAt: commande.createdAt,
      items: commande.items.map((ligne) => ({
        quantite: ligne.quantite,
        name: ligne.parfum?.name,
        brand: ligne.parfum?.brand,
        price: ligne.parfum?.price,
      })),
    }));
  }
}
