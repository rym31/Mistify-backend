import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Parfum } from '../parfums/parfum.entity';

@Entity()
export class Commentaire {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'int' })
  rating: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' }) //Si l’objet parent est supprimé, alors les objets liés sont supprimés automatiquement.
  user: User;

  @ManyToOne(() => Parfum, (parfum) => parfum.id, { onDelete: 'CASCADE' })
  parfum: Parfum;
}