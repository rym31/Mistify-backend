import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentairesService } from './commentaires.service';
import { CreateCommentaireDto } from '../dtos/create-commentaire.dto';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller()
export class CommentairesController {
  constructor(private service: CommentairesService) {}

  // POST /parfums/:parfumId/commentaires
  @UseGuards(AuthGuard)
  @Post('parfums/:parfumId/commentaires')
  create(
    @Param('parfumId') parfumId: string,
    @Body() body: CreateCommentaireDto,
  ) {
    return this.service.create(
      parseInt(parfumId),
      body.userId,
      body.content,
      body.rating,
    );
  }

  // GET /parfums/:parfumId/commentaires
  @Get('parfums/:parfumId/commentaires')
  list(@Param('parfumId') parfumId: string) {
    return this.service.findByParfum(parseInt(parfumId));
  }

  // DELETE /commentaires/:id
  @Delete('commentaires/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}