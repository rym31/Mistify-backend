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

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true, type: 'int' })
  year?: number;

  @Column({ nullable: true })
  topNotes?: string;

  @Column({ nullable: true })
  middleNotes?: string;

  @Column({ nullable: true })
  baseNotes?: string;


}