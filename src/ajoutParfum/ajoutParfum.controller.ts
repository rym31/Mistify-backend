import { Controller, Get, Body, Post } from "@nestjs/common";
import { AjoutParfumService } from "./ajoutParfum.service";
import { CreateAjoutParfumDto } from "src/dtos/create-ajoutParfum.dto";

@Controller('ajout')
export class AjoutParfumController {

    constructor(private  service : AjoutParfumService) {}

    // demande + validation
    // modif/ ajouter form -> BD
    @Post()
    async ajouterParfum(@Body() body: CreateAjoutParfumDto) {
        console.log("here");
        return await this.service.ajouter(body);
        
    }
}