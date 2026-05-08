import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { User } from '../users/user.entity';
import { Parfum } from '../parfums/parfum.entity';
import {Subject} from 'rxjs';
import { UsersService } from 'src/users/services/users.service';


@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepo: Repository<Notification>,
        private usersService: UsersService,
        
    ) { }

    private parfumSubject = new Subject<Parfum>();
    
    
    async createNotification(acheteur: User, parfum: Parfum | undefined, contenu: string, lien?: string) {
        const notification = this.notificationRepo.create({
            acheteur,
            parfum,
            contenu,
            lien,
            lu: false,
        });
        return this.notificationRepo.save(notification);
    }
    
    async findByUser(userId: number): Promise<Notification[]> {
        return this.notificationRepo.find({
            where: { acheteur: { id: userId } },
            relations: ['parfum'],
            order: { dateEnvoi: 'DESC' },
        });
    }

    async compterMessages(userId: number) {
        return this.notificationRepo.count({
            where: {
                acheteur: { id: userId },
            },
        });
    }

    async supprimerMessage(id: number, userId: number) {
        const notification = await this.notificationRepo.findOne({
            where: {
                id,
                acheteur: { id: userId },
            },
        });

        if (!notification) {
            throw new NotFoundException('Message introuvable');
        }

        return this.notificationRepo.remove(notification);
    }

    async notifierUtilisateursParFamille(parfum: Parfum, userIdAExclure?: number) {
        if (!parfum.family) {
            return [];
        }

        const familleParfum = parfum.family.trim().toLowerCase();
        const users = await this.usersService.findAllUsers();
        const usersInteresses = users.filter((user) => {
            if (userIdAExclure && user.id === userIdAExclure) {
                return false;
            }

            const preferences = user.preferencesOlfactives
                ?.split(',')
                .map((preference) => preference.trim().toLowerCase())
                .filter(Boolean) || [];

            return preferences.includes(familleParfum);
        });

        const message = `Un nouveau parfum de type "${parfum.family}" a ete ajoute. Nous pensons qu'il peut vous interesser !`;

        return Promise.all(
            usersInteresses.map((user) =>
                this.createNotification(user, parfum, message, `/parfum/${parfum.id}`)
            )
        );
    }

    emettre(parfum: Parfum) {
        this.parfumSubject.next(parfum);
    }

    getFlux() {
        return this.parfumSubject.asObservable();
    }
    


}
