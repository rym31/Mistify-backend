import { Controller, Get, Body, Post, UseGuards } from "@nestjs/common";
import { AjoutParfumService } from "./ajoutParfum.service";
import { CreateAjoutParfumDto } from "src/dtos/create-ajoutParfum.dto";
import { AdminGuard } from "src/guards/admin.guards";
import { AjoutParfum } from "./ajoutParfum.entity";

@Controller('ajout')
export class AjoutParfumController {

    constructor(private  service : AjoutParfumService) {}

    // demande + validation
    // modif/ ajouter form -> BD
    @Post('/demandeParfum')
    async ajouterParfum(@Body() body: CreateAjoutParfumDto) {
        return await this.service.ajouter(body);
    }

    @UseGuards(AdminGuard)
    @Get('/newParfum')
    async validerParfum(ajoutParfum: AjoutParfum) {
        return await this.service.valider(ajoutParfum.id);
    }
    
}