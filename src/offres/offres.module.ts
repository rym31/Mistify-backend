import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffresController } from './offres.controller';
import { OffresService } from './offres.service';
import { Offre } from './offre.entity';
import { User } from '../users/user.entity';
import { Annonce } from '../annonces/annonce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offre, User, Annonce])],
  controllers: [OffresController],
  providers: [OffresService],
})
export class OffresModule {}