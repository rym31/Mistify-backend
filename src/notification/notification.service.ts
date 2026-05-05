import { Injectable, MessageEvent } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { User } from '../users/user.entity';
import { Parfum } from '../parfums/parfum.entity';
import {Subject} from 'rxjs';


@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepo: Repository<Notification>,
        
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

    emettre(parfum: Parfum) {
        this.parfumSubject.next(parfum);
    }

    getFlux() {
        return this.parfumSubject.asObservable();
    }
    


}
