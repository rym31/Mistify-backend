import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Parfum } from '../parfums/parfum.entity';
import { Commande } from './commande.entity';

@Entity()
export class CommandeItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  quantite: number;

  @ManyToOne(() => Commande, (commande) => commande.items, { onDelete: 'CASCADE' })
  commande: Commande;

  @ManyToOne(() => Parfum, { onDelete: 'CASCADE' })
  parfum: Parfum;
}
