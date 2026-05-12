import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { FamilleOlfactives } from './familleOlfactive.entity';
import { Parfum } from '../parfums/parfum.entity';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class FamilleOlfactivesService {
  constructor(
    @InjectRepository(FamilleOlfactives) private repo: Repository<FamilleOlfactives>,
    private notificationService: NotificationService,
  ) {
    this.abonner(this.notificationService);
  }

  private observateurs: any[] = [];

  create(attrs: Partial<FamilleOlfactives>) {
    const familleOlfactive = this.repo.create(attrs);
    return this.repo.save(familleOlfactive);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  findByName(name: string) {
    return this.repo.findOne({ where: { name: ILike(name) } });
  }

  abonner(observateur: any) {
    this.observateurs.push(observateur);
  }

  async notifier(parfum: Parfum) {
    for (const observateur of this.observateurs) {
      await observateur.notifierUsersMatchants(parfum);
    }
  }

  async ajouterParfum(parfum: Parfum) {
    await this.notifier(parfum);
  }
}
