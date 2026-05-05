import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Parfum {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @Column({ nullable: true }) //nullable = peut etre vide
  description?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ type: 'float' })
  price?: number;

  @Column({ type: 'int' })
  volume!: number;
  
  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true, type: 'int' })
  year?: number;
  
}