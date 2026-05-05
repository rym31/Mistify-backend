import { Injectable, NotFoundException } from "@nestjs/common";
import { AjoutParfum } from "./ajoutParfum.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAjoutParfumDto } from "src/dtos/create-ajoutParfum.dto";
import { Statut } from "./Statut";
import { Parfum } from "src/parfums/parfum.entity";

@Injectable()
export class AjoutParfumService {
    constructor(@InjectRepository (AjoutParfum) private repo : Repository<AjoutParfum>){}

    ajouter(createAjoutParfum: CreateAjoutParfumDto) {
        const parfum = this.repo.create(createAjoutParfum);
        return this.repo.save(parfum);
    }

    async valider(id : number,statut : Statut ) {
        const demandeParfum = await this.repo.findOne({where: {id}});
        
        if(!demandeParfum) {
            throw new NotFoundException('Demande de parfum introuvable');
        }

        demandeParfum.statut = statut;

        return this.repo.save(demandeParfum);
    }

    async accepter(id : number) {
        return this.valider(id, Statut.ACCEPTER);
    }
    
    async refuser(id : number) {
        return this.valider(id, Statut.REFUSER);
    }

    async refuse() {
        return false;
    }
    async findById(id : number) {
        return await this.repo.findOne({where : {id}});
    }

    async update( id : number, attrs: Partial<Parfum>) {
        const demandeParfum = await this.repo.findOne({where : {id}});

        if(!demandeParfum) throw new NotFoundException('Demande de parfum not found'); {
            Object.assign(demandeParfum, attrs);
            return this.repo.save(demandeParfum);
        }
            
        
    }
    delete(id : number) {
        return this.repo.delete({id})
    }

    deleteAll() {
        return this.repo.clear();
    }
    

    // si ca existe, bah tu peux pas rajouter un avec les memes infos
}