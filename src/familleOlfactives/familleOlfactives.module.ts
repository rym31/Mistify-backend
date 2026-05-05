import { Module } from '@nestjs/common';
import { FamilleOlfactivesController } from './familleOlfactives.controller';
import { FamilleOlfactives } from './familleOlfactive.entity';
import { FamilleOlfactivesService } from './familleOlfactives.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([FamilleOlfactives]), NotificationModule],
  providers: [FamilleOlfactivesService],
  controllers: [FamilleOlfactivesController],
  exports: [FamilleOlfactivesService]
})
export class FamilleOlfactivesModule {}
