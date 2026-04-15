import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

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

  @Column({ type: 'float' })
  price?: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
  
}