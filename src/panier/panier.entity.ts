import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Parfum } from '../parfums/parfum.entity';
import { User } from '../users/user.entity';

@Entity()
export class Panier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  quantite: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Parfum, { onDelete: 'CASCADE' })
  parfum: Parfum;
}
