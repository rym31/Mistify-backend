import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { Contacts } from './contacts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contacts])],
  controllers: [ContactsController],
  providers: [ContactsService]
})
export class ContactsModule {}
