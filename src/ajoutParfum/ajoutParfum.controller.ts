import { Controller, Param, Body, Post, UseGuards } from "@nestjs/common";
import { AjoutParfumService } from "./ajoutParfum.service";
import { CreateAjoutParfumDto } from "src/dtos/create-ajoutParfum.dto";
import { AdminGuard } from "src/guards/admin.guards";
import { AjoutParfum } from "./ajoutParfum.entity";

@Controller('ajout')
export class AjoutParfumController {

    constructor(private  service : AjoutParfumService) {}

    // demande + validation
    @Post('/demandeParfum')
    async ajouterParfum(@Body() body: CreateAjoutParfumDto) {
        return await this.service.ajouter(body);
    }

    @UseGuards(AdminGuard)
    @Post('/newParfum/:id')
    async validerParfum(@Param('id') id: string) {
        return await this.service.valider(+id);
    }
    
}