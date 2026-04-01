import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AnnoncesService } from './annonces.service';
import { CreateAnnonceDto } from '../dtos/create-annonce.dto';

@Controller('annonces')
export class AnnoncesController {

  constructor(private service: AnnoncesService) {}

  @Post() //POST http://localhost:3000/annonces
  create(@Body() body: CreateAnnonceDto) {
    return this.service.create(
      body.price,
      body.sellerId,
      body.parfumId,
      body.description
    );
  }

  //i cant use my brain anymore.. getting close to do a OD 23feb

  @Get() // GET http://localhost:3000/annonces
  findAll() {
    return this.service.findAll();
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}