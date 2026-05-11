import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Parfum } from '../parfums/parfum.entity';
import { User } from '../users/user.entity';

@Entity()
export class Panier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  quantite: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) //CASCADE = si le parfum parent est supprimé, toutes les entités liées à ce parfum seront automatiquement supprimées par la base de données.
  user: User;

  @ManyToOne(() => Parfum, { onDelete: 'CASCADE' }) //CASCADE = si le parfum parent est supprimé, toutes les entités liées à ce parfum seront automatiquement supprimées par la base de données.
  parfum: Parfum;
}
