import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AjoutParfumController } from './ajoutParfum.controller';
import { AjoutParfumService } from './ajoutParfum.service';
import { AjoutParfum } from './ajoutParfum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AjoutParfum])],
  controllers: [AjoutParfumController],
  providers: [AjoutParfumService],
})
export class ParfumsModule {}