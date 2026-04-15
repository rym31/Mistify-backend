import {AfterInsert, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default:true}) //A CHANGER
  admin:boolean;

  @AfterInsert()
  logInsert() {
    console.log(`(・・?) Nouvel utilisateur ajouté w0w! ID: ${this.id}`);
}
}
