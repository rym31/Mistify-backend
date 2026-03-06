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

  @Column({default:true})
  admin:boolean;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted user with id: ${this.id}`);
}
}
