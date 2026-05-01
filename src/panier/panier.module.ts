import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parfum } from '../parfums/parfum.entity';
import { User } from '../users/user.entity';
import { PanierController } from './panier.controller';
import { Panier } from './panier.entity';
import { PanierService } from './panier.service';

@Module({
  imports: [TypeOrmModule.forFeature([Panier, User, Parfum])],
  controllers: [PanierController],
  providers: [PanierService],
})
export class PanierModule {}
