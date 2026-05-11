import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Parfum } from '../parfums/parfum.entity';

@Entity()
export class Notification {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  acheteur: User;

  @ManyToOne(() => Parfum, { nullable: true, onDelete: 'SET NULL' })
  parfum?: Parfum | null;

  @Column()
  contenu: string;

  @Column({ nullable: true })
  lien?: string;

  @Column({ default: false })
  lu: boolean;

  @CreateDateColumn()
  dateEnvoi: Date;
}


