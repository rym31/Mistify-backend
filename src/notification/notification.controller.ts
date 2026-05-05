import { Controller, Get, MessageEvent, Session, Sse } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { filter, map, Observable } from 'rxjs';
import { UsersService } from '../users/services/users.service';

@Controller('notifications')
export class NotificationController {

  constructor(private notificationService: NotificationService, private usersService: UsersService) {

  }

  @Get('user-notifications')
  async getUserNotifications(@Session() session: any) {
    const userId = session.userId;
    return this.notificationService.findByUser(userId);
  }

  @Sse('notifications-parfums')
  async getNotificationsParfums(@Session() session: any): Promise<Observable<MessageEvent>> {
    const user = await this.usersService.findOne(session.userId);
    const prefs = user?.preferencesOlfactives?.split(',') ?? [];

    return this.notificationService.getFlux().pipe(
      filter(parfum => prefs.includes(parfum.family)),
      map(parfum => ({
        data: `Nouveau parfum "${parfum.name}" correspond à vos préférences!`
      } as MessageEvent))
    );
  }
}
