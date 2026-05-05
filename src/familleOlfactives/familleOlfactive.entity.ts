import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FamilleOlfactives {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("simple-array", { nullable: true })
    notes?: string[];
}