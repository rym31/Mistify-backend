import { Injectable, NotFoundException } from "@nestjs/common";
import { AjoutParfum } from "./ajoutParfum.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAjoutParfumDto } from "../dtos/create-ajoutParfum.dto";
import { Statut } from "./Statut";
import { Parfum } from "../parfums/parfum.entity";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class AjoutParfumService {
    constructor(
        @InjectRepository(AjoutParfum) private repo: Repository<AjoutParfum>,
        @InjectRepository(Parfum) private parfumRepo: Repository<Parfum>,
        private notificationService: NotificationService,
    ) {}

    ajouter(createAjoutParfum: CreateAjoutParfumDto) {
        const demande = this.repo.create({
            ...createAjoutParfum,
            statut: Statut.EN_ATTENTE,
            user: { id: createAjoutParfum.userId },
        });

        return this.repo.save(demande);
    }

    findAll() {
        return this.repo.find({
            relations: { user: true },
            order: { id: 'DESC' },
        });
    }

    findEnAttente() {
        return this.repo.find({
            where: { statut: Statut.EN_ATTENTE },
            relations: { user: true },
            order: { id: 'DESC' },
        });
    }

    async valider(id: number, statut: Statut) {
        const demandeParfum = await this.repo.findOne({ where: { id } });

        if(!demandeParfum) {
            throw new NotFoundException('Demande de parfum introuvable');
        }

        demandeParfum.statut = statut;

        return this.repo.save(demandeParfum);
    }

    async accepter(id: number, messageAdmin?: string) {
        const demandeParfum = await this.repo.findOne({
            where: { id },
            relations: { user: true },
        });

        if(!demandeParfum) {
            throw new NotFoundException('Demande de parfum introuvable');
        }

        const parfum = this.parfumRepo.create({
            name: demandeParfum.name,
            brand: demandeParfum.brand,
            description: demandeParfum.description,
            imageUrl: demandeParfum.imageUrl,
            price: demandeParfum.price,
            volume: demandeParfum.volume,
            gender: demandeParfum.gender,
            family: demandeParfum.family,
            year: demandeParfum.year,
            disponibility: true,
        });

        const parfumAjoute = await this.parfumRepo.save(parfum);
        const message = messageAdmin?.trim()
            ? messageAdmin.trim()
            : `Bonne nouvelle, votre demande pour ${demandeParfum.brand} - ${demandeParfum.name} a ete acceptee!!!`;

        await this.notificationService.createNotification(
            demandeParfum.user,
            parfumAjoute,
            message,
            `/parfum/${parfumAjoute.id}`,
        );

        await this.notificationService.notifierUtilisateursParFamille(
            parfumAjoute,
            demandeParfum.user.id,
        );

        await this.repo.delete({ id });

        return {
            message: 'Demande acceptee!!!, parfum ajoute dans la collection.',
            parfum: parfumAjoute,
        };
    }
    
    async refuser(id: number, messageAdmin?: string) {
        const demandeParfum = await this.repo.findOne({
            where: { id },
            relations: { user: true },
        });

        if(!demandeParfum) {
            throw new NotFoundException('Demande de parfum introuvable');
        }

        const message = messageAdmin?.trim()
            ? messageAdmin.trim()
            : `Votre demande pour ${demandeParfum.brand} - ${demandeParfum.name} a ete refusee....`;

        await this.notificationService.createNotification(
            demandeParfum.user,
            undefined,
            message,
        );

        await this.repo.delete({ id });

        return {
            message: 'Demande refusee et supprimee.',
        };
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
