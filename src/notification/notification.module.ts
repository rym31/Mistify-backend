import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';
import { UsersModule } from 'src/users/users.module';
import { Parfum } from 'src/parfums/parfum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Parfum]), UsersModule],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
