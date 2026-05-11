import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ParfumsModule } from './parfums/parfums.module';
import { Parfum } from './parfums/parfum.entity';
import { CommentairesModule } from './commentaires/commentaires.module';
import { Commentaire } from './commentaires/commentaire.entity';
import { AjoutParfum } from './ajoutParfum/ajoutParfum.entity';
import { AjoutParfumModule } from './ajoutParfum/ajoutParfum.module';
import { Notification } from './notification/notification.entity';
import { NotificationModule } from './notification/notification.module';
import { FamilleOlfactivesModule } from './familleOlfactives/familleOlfactives.module';
import { FamilleOlfactives } from './familleOlfactives/familleOlfactive.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Panier } from './panier/panier.entity';
import { PanierModule } from './panier/panier.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Parfum, Commentaire, AjoutParfum, Panier, Notification, FamilleOlfactives],
      synchronize: true
    }),
    UsersModule,
    ParfumsModule,
    CommentairesModule,
    PanierModule,
    AjoutParfumModule,
    NotificationModule,
    FamilleOlfactivesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
