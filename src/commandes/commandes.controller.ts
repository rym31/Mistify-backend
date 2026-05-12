import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guards';
import { CommandesService } from './commandes.service';

@Controller('commandes')
@UseGuards(AuthGuard)
export class CommandesController {
  constructor(private service: CommandesService) {}

  @Post()
  creer(
    @Session() session: any,
    @Body('items') items: any[],
    @Body('total') total: number,
  ) {
    return this.service.creer(session.userId, items, total);
  }

  @Get('mes-commandes')
  mesCommandes(@Session() session: any) {
    return this.service.mesCommandes(session.userId);
  }
}
