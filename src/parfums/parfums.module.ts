import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParfumsController } from './parfums.controller';
import { ParfumsService } from './parfums.service';
import { Parfum } from './parfum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parfum])],
  controllers: [ParfumsController],
  providers: [ParfumsService],
})
export class ParfumsModule {}