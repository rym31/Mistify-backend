import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Parfum } from '../parfums/parfum.entity';

@Entity()
export class Notification {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  acheteur: User;

  @ManyToOne(() => Parfum)
  parfum: Parfum;

  @Column()
  contenu: string;

  @CreateDateColumn()
  dateEnvoi: Date;
}




