import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum TypeDemande {
  DEMANDE_GENERALE = 'DEMANDE_GENERALE',
  SIGNALEMENT_PROBLEME = 'SIGNALEMENT_PROBLEME',
}

export enum StatutDemande {
  EN_ATTENTE = 'EN_ATTENTE',
  RESOLU = 'RESOLU',
}

@Entity()
export class Contacts {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;

  @Column()
  email!: string;

  @Column({
    type: 'varchar',
    default: TypeDemande.DEMANDE_GENERALE,
  })
  type!: string;

  @Column('text')
  message!: string;

  @Column({
    type: 'varchar',
    default: StatutDemande.EN_ATTENTE,
  })
  statut!: string;

  @CreateDateColumn()
  dateCreation!: Date;
}
