import { AfterInsert, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { FamilleOlfactives } from '../familleOlfactives/familleOlfactive.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @ManyToOne(() => FamilleOlfactives, { nullable: true, eager: true })
  preference?: FamilleOlfactives;

  @AfterInsert()
  logInsert() {
    console.log(`(・・?) Nouvel utilisateur ajouté w0w! ID: ${this.id}`);
  }
}
