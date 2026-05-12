import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Parfum } from '../parfums/parfum.entity';

@Entity()
export class FamilleOlfactives {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column("simple-array", { nullable: true })
    notes?: string[];

    @OneToMany(() => Parfum, (parfum) => parfum.famille)
    parfums?: Parfum[];
}