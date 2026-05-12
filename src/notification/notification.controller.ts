import { Controller, Delete, Get, MessageEvent, Param, Session, Sse } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { filter, map, Observable } from 'rxjs';
import { UsersService } from '../users/services/users.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private usersService: UsersService,
  ) {}

  @Get('mes-notifications')
  async getMesNotifications(@Session() session: any) {
    return this.notificationService.findByUser(session.userId);
  }

  @Delete(':id')
  async supprimerNotification(@Param('id') id: string) {
    return this.notificationService.delete(+id);
  }

  @Sse('notifications-parfums')
  async getNotificationsParfums(@Session() session: any): Promise<Observable<MessageEvent>> {
    const user = await this.usersService.findOne(session.userId);
    return this.notificationService.getFlux().pipe(
      filter(parfum => user?.preference?.id === parfum.famille?.id),
      map(parfum => ({
        data: `Nouveau parfum "${parfum.name}" correspond à vos préférences!`
      } as MessageEvent))
    );
  }
}
