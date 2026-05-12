import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parfum } from '../parfums/parfum.entity';
import { User } from '../users/user.entity';
import { CommandeItem } from './commande-item.entity';
import { Commande } from './commande.entity';
import { CommandesController } from './commandes.controller';
import { CommandesService } from './commandes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Commande, CommandeItem, User, Parfum])],
  controllers: [CommandesController],
  providers: [CommandesService],
})
export class CommandesModule {}
