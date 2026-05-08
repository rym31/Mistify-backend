import { Controller, Param, Body, Post, UseGuards, Get, Delete } from "@nestjs/common";
import { AjoutParfumService } from "./ajoutParfum.service";
import { CreateAjoutParfumDto } from "src/dtos/create-ajoutParfum.dto";
import { AdminGuard } from "src/guards/admin.guards";
import { Statut } from "./Statut";
import { AuthGuard } from "src/guards/auth.guards";

@Controller('ajout')
export class AjoutParfumController {

    constructor(private  service : AjoutParfumService) {}

    // demande + validation
    @UseGuards(AuthGuard)
    @Post('/demandeParfum')
    async ajouterParfum(@Body() body: CreateAjoutParfumDto) {
        return await this.service.ajouter(body);
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Get('/demandes')
    async toutesLesDemandes() {
        return await this.service.findAll();
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Get('/demandes/en-attente')
    async demandesEnAttente() {
        return await this.service.findEnAttente();
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Post('/accepter/:id')
    async accepterParfum(@Param('id') id: string, @Body('messageAdmin') messageAdmin?: string) {
        return await this.service.accepter(+id, messageAdmin);
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Post('/refuser/:id')
    async refuserParfum(@Param('id') id: string, @Body('messageAdmin') messageAdmin?: string) {
        return await this.service.refuser(+id, messageAdmin);
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Post('/newParfum/:id')
    async validerParfum(@Param('id') id: string, @Body('statut') statut: Statut) {
        return await this.service.valider(+id, statut);
    }

    @Get('/:id')
    async findParfum(@Param('id') id : string) {
        return await this.service.findById(+id);
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Delete('/:id')
    supprimerParfum(@Param('id') id : string) {
        return this.service.delete(+id);
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Delete('/supp/all')
    supprimerAllParfums() {
        return this.service.deleteAll();
    }
}
