import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { User } from '../users/user.entity';
import { Parfum } from '../parfums/parfum.entity';
import { Subject } from 'rxjs';
import { UsersService } from '../users/services/users.service';


@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepo: Repository<Notification>,
        private usersService: UsersService,
    ) { }

    private parfumSubject = new Subject<Parfum>();
    
    
    async createNotification(acheteur: User, parfum: Parfum, contenu: string) {
        const notification = this.notificationRepo.create({
            acheteur,
            parfum,
            contenu,
        });
        await this.notificationRepo.save(notification);
    }
    
    async findByUser(userId: number): Promise<Notification[]> {
        return this.notificationRepo.find({
            where: { acheteur: { id: userId } },
            relations: ['parfum'],
            order: { dateEnvoi: 'DESC' },
        });
    }

    async delete(id: number) {
        return this.notificationRepo.delete(id);
    }

    async notifierUsersMatchants(parfum: Parfum) {
        const users = await this.usersService.findAllUsers();
        const interesses = users.filter(user =>
            user.preference?.id === parfum.famille?.id
        );
        for (const user of interesses) {
            await this.createNotification(
                user,
                parfum,
                `Nouveau parfum "${parfum.name}" de la famille "${parfum.famille?.name}" correspond à vos préférences !`
            );
        }
        this.parfumSubject.next(parfum);
    }

    emettre(parfum: Parfum) {
        this.parfumSubject.next(parfum);
    }

    getFlux() {
        return this.parfumSubject.asObservable();
    }
    


}
