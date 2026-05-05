import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParfumsController } from './parfums.controller';
import { ParfumsService } from './parfums.service';
import { Parfum } from './parfum.entity';
import { FamilleOlfactivesModule } from 'src/familleOlfactives/familleOlfactives.module';


@Module({
  imports: [TypeOrmModule.forFeature([Parfum]), FamilleOlfactivesModule],
  controllers: [ParfumsController],
  providers: [ParfumsService],
})
export class ParfumsModule {}