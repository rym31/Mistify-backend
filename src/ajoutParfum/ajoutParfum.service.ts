import { Injectable, NotFoundException } from "@nestjs/common";
import { AjoutParfum } from "./ajoutParfum.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAjoutParfumDto } from "src/dtos/create-ajoutParfum.dto";
import { Parfum } from "src/parfums/parfum.entity";

@Injectable()
export class AjoutParfumService {
    constructor(@InjectRepository (AjoutParfum) private repo : Repository<AjoutParfum>, 
                @InjectRepository (Parfum) private repoParfum : Repository<Parfum>) {}

    ajouter(createAjoutParfum: CreateAjoutParfumDto) {
        const parfum = this.repo.create(createAjoutParfum);
        return this.repo.save(parfum);
    }

    async valider(id : number) {
        const demandeParfum = await this.repo.findOne({where: {id}});
        
        if(demandeParfum) {
           const newParfum = this.repoParfum.create({
            name: demandeParfum.name,
            brand: demandeParfum.brand,
            description: demandeParfum.description,
            imageUrl: demandeParfum.imageUrl,
            country: demandeParfum.country,
            gender: demandeParfum.gender,
            year: demandeParfum.year,
            topNotes: demandeParfum.topNotes,
            middleNotes: demandeParfum.middleNotes,
            baseNotes: demandeParfum.baseNotes,
            price: demandeParfum.price
           });

           await this.repoParfum.save(newParfum);

           await this.repo.remove(demandeParfum);

        }
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
        return this.repo.deleteAll();
    }
    

    // si ca existe, bah tu peux pas rajouter un avec les memes infos
}