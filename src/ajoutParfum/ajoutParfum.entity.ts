import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import {Statut} from "./Statut"

@Entity()
export class AjoutParfum {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ nullable: true }) //nullable = peut etre vide
  description?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ type: 'float', nullable: true})
  price?: number;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true, type: 'int' })
  year?: number;

  @Column({type: 'enum', enum: Statut, default: Statut.EN_ATENTE}) 
  statut: Statut;
  
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
  
}