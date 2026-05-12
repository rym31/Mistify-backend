import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FamilleOlfactives } from '../familleOlfactives/familleOlfactive.entity';

@Entity()
export class Parfum {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => FamilleOlfactives, (famille) => famille.parfums, { nullable: true, eager: true })
  famille?: FamilleOlfactives;

  @Column({ nullable: true })
  rating?: number;

  @Column({ nullable: true })
  volume?: number;

  @Column({ type: 'float', nullable: true })
  price?: number;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true, type: 'int' })
  year?: number;

  @Column({ nullable: true })
  disponibility?: boolean;

  @Column({ nullable: true })
  imageUrl?: string;
}
