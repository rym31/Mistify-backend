import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParfumsController } from './parfums.controller';
import { ParfumsService } from './parfums.service';
import { Parfum } from './parfum.entity';
import { FamilleOlfactivesModule } from '../familleOlfactives/familleOlfactives.module';
import { Notification } from '../notification/notification.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Parfum, Notification]), FamilleOlfactivesModule],
  controllers: [ParfumsController],
  providers: [ParfumsService],
})
export class ParfumsModule {}
