import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentairesController } from './commentaires.controller';
import { CommentairesService } from './commentaires.service';
import { Commentaire } from './commentaire.entity';
import { User } from '../users/user.entity';
import { Parfum } from '../parfums/parfum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commentaire, User, Parfum])], // sinnon ca marhce appppppp!
  controllers: [CommentairesController],
  providers: [CommentairesService],
})
export class CommentairesModule {}