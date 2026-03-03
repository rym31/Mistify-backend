import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateCommentaireDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsInt()
  userId: number;
}