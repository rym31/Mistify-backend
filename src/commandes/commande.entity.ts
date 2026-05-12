import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { CommandeItem } from './commande-item.entity';

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => CommandeItem, (item) => item.commande, { cascade: true })
  items: CommandeItem[];

  @Column('float')
  total: number;

  @Column({ default: 'Confirmée' })
  statut: string;

  @CreateDateColumn()
  createdAt: Date;
}
