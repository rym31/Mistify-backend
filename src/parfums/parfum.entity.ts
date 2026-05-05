import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ nullable: true })
  family?: string;

  @Column({ nullable: true })
  rating?: number;

  @Column({ nullable: true })
  volume?: number;

  @Column({ type: 'float' })
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
