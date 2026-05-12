import { Injectable, NotFoundException } from "@nestjs/common";
import { AjoutParfum } from "./ajoutParfum.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAjoutParfumDto } from "src/dtos/create-ajoutParfum.dto";
import { Statut } from "./Statut";
import { Parfum } from "src/parfums/parfum.entity";
import { FamilleOlfactivesService } from "src/familleOlfactives/familleOlfactives.service";

@Injectable()
export class AjoutParfumService {
    constructor(
        @InjectRepository(AjoutParfum) private repo: Repository<AjoutParfum>,
        @InjectRepository(Parfum) private parfumRepo: Repository<Parfum>,
        private familleOlfactivesService: FamilleOlfactivesService,
    ) {}

    ajouter(createAjoutParfum: CreateAjoutParfumDto) {
        const parfum = this.repo.create(createAjoutParfum);
        return this.repo.save(parfum);
    }

    async valider(id: number, statut: Statut) {
        const demandeParfum = await this.repo.findOne({ where: { id } });
        if (!demandeParfum) throw new NotFoundException('Demande de parfum introuvable');
        demandeParfum.statut = statut;
        return this.repo.save(demandeParfum);
    }

    async accepter(id: number) {
        const demande = await this.repo.findOne({ where: { id } });
        if (!demande) throw new NotFoundException('Demande introuvable');

        demande.statut = Statut.ACCEPTER;
        await this.repo.save(demande);

        const famille = demande.family
            ? await this.familleOlfactivesService.findByName(demande.family)
            : null;

        const nouveauParfum = this.parfumRepo.create({
            name: demande.name,
            brand: demande.brand,
            description: demande.description,
            imageUrl: demande.imageUrl,
            price: demande.price,
            gender: demande.gender,
            famille: famille ?? undefined,
            year: demande.year,
            volume: demande.volume,
        });

        const saved = await this.parfumRepo.save(nouveauParfum);
        const savedAvecFamille = await this.parfumRepo.findOne({ where: { id: saved.id } });
        await this.familleOlfactivesService.ajouterParfum(savedAvecFamille);

        return savedAvecFamille;
    }

    async refuser(id: number) {
        return this.valider(id, Statut.REFUSER);
    }

    async refuse() {
        return false;
    }

    async findById(id: number) {
        return await this.repo.findOne({ where: { id } });
    }

    async findEnAttente() {
        return this.repo.find({ where: { statut: Statut.EN_ATTENTE } });
    }

    async findAll() {
        return this.repo.find();
    }

    async update(id: number, attrs: Partial<Parfum>) {
        const demandeParfum = await this.repo.findOne({ where: { id } });
        if (!demandeParfum) throw new NotFoundException('Demande de parfum not found');
        Object.assign(demandeParfum, attrs);
        return this.repo.save(demandeParfum);
    }

    delete(id: number) {
        return this.repo.delete({ id });
    }

    deleteAll() {
        return this.repo.clear();
    }
}
