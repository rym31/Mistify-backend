import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Parfum } from '../parfums/parfum.entity';

@Entity()
export class Annonce {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ default: true })
  available: boolean;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  seller: User;

  @ManyToOne(() => Parfum, { onDelete: 'CASCADE' })
  parfum: Parfum;
}