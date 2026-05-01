import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guards';
import { PanierService } from './panier.service';

@Controller('panier')
@UseGuards(AuthGuard)
export class PanierController {
  constructor(private service: PanierService) {}

  @Get()
  voirPanier(@Session() session: any) {
    return this.service.voirPanier(session.userId);
  }

  @Post()
  ajouter(
    @Session() session: any,
    @Body('parfumId') parfumId: number,
    @Body('quantite') quantite?: number,
  ) {
    return this.service.ajouter(
      session.userId,
      Number(parfumId),
      Number(quantite || 1),
    );
  }

  @Patch('/:parfumId')
  modifierQuantite(
    @Session() session: any,
    @Param('parfumId') parfumId: string,
    @Body('quantite') quantite: number,
  ) {
    return this.service.modifierQuantite(
      session.userId,
      parseInt(parfumId),
      Number(quantite),
    );
  }

  @Delete('/:parfumId')
  supprimer(@Session() session: any, @Param('parfumId') parfumId: string) {
    return this.service.supprimer(session.userId, parseInt(parfumId));
  }

  @Delete()
  vider(@Session() session: any) {
    return this.service.vider(session.userId);
  }
}
