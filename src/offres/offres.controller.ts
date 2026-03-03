import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OffresService } from './offres.service';
import { CreateOffreDto } from '../dtos/create-offre.dto';

@Controller()
export class OffresController {
  constructor(private service: OffresService) {}

  @Post('annonces/:annonceId/offres') //POST http://localhost:3000/annonces/2/offres
  create(
    @Param('annonceId') annonceId: string,
    @Body() body: CreateOffreDto,
  ) {
    return this.service.create(parseInt(annonceId), body.buyerId, body.amount);
  }


  @Get('annonces/:annonceId/offres') //GET http://localhost:3000/annonces/2/offres
  list(@Param('annonceId') annonceId: string) {
    return this.service.findByAnnonce(parseInt(annonceId));
  }


  @Patch('offres/:id/accept') //PATCH http://localhost:3000/offres/1/accept
  accept(@Param('id') id: string) {
    return this.service.accept(parseInt(id));
  }

  
  @Patch('offres/:id/refuser') //PATCH http://localhost:3000/offres/1/refuser
  reject(@Param('id') id: string) {
    return this.service.reject(parseInt(id));
  }
}