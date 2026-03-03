import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Annonce } from '../annonces/annonce.entity';

export type OfferStatus = '3N ATteNte...' | 'accepter' | 'refuser!';

@Entity()
export class Offre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ default: '3N ATteNte...' })
  status: '3N ATteNte...' | 'accepter' | 'refuser!';

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  buyer: User;

  @ManyToOne(() => Annonce, { onDelete: 'CASCADE' })
  annonce: Annonce;
}