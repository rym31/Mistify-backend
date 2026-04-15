import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AjoutParfumController } from './ajoutParfum.controller';
import { AjoutParfumService } from './ajoutParfum.service';
import { AjoutParfum } from './ajoutParfum.entity';
import { Parfum } from 'src/parfums/parfum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AjoutParfum, Parfum])],
  controllers: [AjoutParfumController],
  providers: [AjoutParfumService],
})
export class AjoutParfumModule {}