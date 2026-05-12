import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AjoutParfumController } from './ajoutParfum.controller';
import { AjoutParfumService } from './ajoutParfum.service';
import { AjoutParfum } from './ajoutParfum.entity';
import { Parfum } from 'src/parfums/parfum.entity';
import { FamilleOlfactivesModule } from 'src/familleOlfactives/familleOlfactives.module';

@Module({
  imports: [TypeOrmModule.forFeature([AjoutParfum, Parfum]), FamilleOlfactivesModule],
  controllers: [AjoutParfumController],
  providers: [AjoutParfumService],
})
export class AjoutParfumModule {}
