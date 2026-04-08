import { Injectable } from "@nestjs/common";
import { AjoutParfum } from "./ajoutParfum.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAjoutParfumDto } from "src/dtos/create-ajoutParfum.dto";

@Injectable()
export class AjoutParfumService {
    constructor(@InjectRepository (AjoutParfum) private repo : Repository<AjoutParfum>) {}

    ajouter(createAjoutParfum: CreateAjoutParfumDto) {
        const parfum = this.repo.create(createAjoutParfum);
        return this.repo.save(parfum);
    }
}