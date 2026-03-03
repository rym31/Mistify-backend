import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annonce } from './annonce.entity';
import { AnnoncesController } from './annonces.controller';
import { AnnoncesService } from './annonces.service';
import { User } from '../users/user.entity';
import { Parfum } from '../parfums/parfum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Annonce, User, Parfum])],
  controllers: [AnnoncesController],
  providers: [AnnoncesService],
})
export class AnnoncesModule {}