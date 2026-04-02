import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DemandeParfum {
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
}