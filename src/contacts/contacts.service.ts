import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacts } from './contacts.entity';
import { CreateContactDto } from '../dtos/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private contactsRepository: Repository<Contacts>,
  ) {}

  create(contactDto: CreateContactDto) {
    const contact = this.contactsRepository.create(contactDto);
    return this.contactsRepository.save(contact);
  }

  findAll() {
    return this.contactsRepository.find();
  }
}
