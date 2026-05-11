import { Controller, Delete, Get, MessageEvent, Param, Patch, Session, Sse, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { filter, map, Observable } from 'rxjs';
import { UsersService } from '../users/services/users.service';
import { AuthGuard } from '../guards/auth.guards';

@Controller('notifications')
export class NotificationController {

  constructor(private notificationService: NotificationService, private usersService: UsersService) {

  }

  @UseGuards(AuthGuard)
  @Get('user-notifications')
  async getUserNotifications(@Session() session: any) {
    const userId = session.userId;
    return this.notificationService.findByUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get('non-lues')
  async getNombreMessagesNonLus(@Session() session: any) {
    const total = await this.notificationService.compterMessages(session.userId);
    return { total };
  }

  @UseGuards(AuthGuard)
  @Patch(':id/lu')
  async marquerCommeLu(@Param('id') id: string, @Session() session: any) {
    return this.notificationService.supprimerMessage(parseInt(id), session.userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async supprimerMessage(@Param('id') id: string, @Session() session: any) {
    return this.notificationService.supprimerMessage(parseInt(id), session.userId);
  }

  @UseGuards(AuthGuard)
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
