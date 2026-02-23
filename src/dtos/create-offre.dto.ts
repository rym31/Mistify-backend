import { IsInt, Min } from 'class-validator';

export class CreateOffreDto {
  @IsInt()
  @Min(1)
  amount: number;
  @IsInt()
  buyerId: number;
}