import { Entity, Column } from 'typeorm';

@Entity()
export class AjoutParfum {

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  userId: string;

  
}