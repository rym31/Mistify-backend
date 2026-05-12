import { Controller, Param, Body, Post, UseGuards, Get } from "@nestjs/common";
import { AjoutParfumService } from "./ajoutParfum.service";
import { CreateAjoutParfumDto } from "src/dtos/create-ajoutParfum.dto";
import { AdminGuard } from "src/guards/admin.guards";
import { Statut } from "./Statut";

@Controller('ajout')
export class AjoutParfumController {

    constructor(private service: AjoutParfumService) {}

    @Post('/demandeParfum')
    async ajouterParfum(@Body() body: CreateAjoutParfumDto) {
        return await this.service.ajouter(body);
    }

    @Get('/demandes/en-attente')
    async demandesEnAttente() {
        return await this.service.findEnAttente();
    }

    @UseGuards(AdminGuard)
    @Post('/accepter/:id')
    async accepterDemande(
        @Param('id') id: string,
        @Body('messageAdmin') messageAdmin: string,
    ) {
        return await this.service.accepter(+id);
    }

    @UseGuards(AdminGuard)
    @Post('/refuser/:id')
    async refuserDemande(
        @Param('id') id: string,
        @Body('messageAdmin') messageAdmin: string,
    ) {
        return await this.service.refuser(+id);
    }

    @UseGuards(AdminGuard)
    @Post('/supp/all')
    supprimerAllParfums() {
        return this.service.deleteAll();
    }
}