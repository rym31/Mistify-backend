import { Controller, Param, Body, Post, UseGuards, Get } from "@nestjs/common";
import { AjoutParfumService } from "./ajoutParfum.service";
import { CreateAjoutParfumDto } from "src/dtos/create-ajoutParfum.dto";
import { AdminGuard } from "src/guards/admin.guards";

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

    @Get()
    async findParfum(@Param('id') id : string) {
        return await this.service.findById(+id);
    }
    @Post('/')
    @Post('/:id')
    supprimerParfum(@Param('id') id : string) {
        return this.service.delete(+id);
    }

    @UseGuards(AdminGuard)
    @Post('/supp/all')
    supprimerAllParfums() {
        return this.service.deleteAll();
    }


    // il en manque CRUD entre autre et jai valider, mais
    // jai vu que yen a dautre ils ont refuser et accepter....
}