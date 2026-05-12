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
import { AnnoncesModule } from './annonces/annonces.module';
import { Annonce } from './annonces/annonce.entity';
import { OffresModule } from './offres/offres.module';
import { Offre } from './offres/offre.entity';
import { AjoutParfum } from './ajoutParfum/ajoutParfum.entity';
import { AjoutParfumModule } from './ajoutParfum/ajoutParfum.module';
import { Contacts } from './contacts/contacts.entity';
import { ContactsModule } from './contacts/contacts.module';
import { Notification } from './notification/notification.entity';
import { NotificationModule } from './notification/notification.module';
import { FamilleOlfactivesModule } from './familleOlfactives/familleOlfactives.module';
import { FamilleOlfactives } from './familleOlfactives/familleOlfactive.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Panier } from './panier/panier.entity';
import { PanierModule } from './panier/panier.module';
import { Commande } from './commandes/commande.entity';
import { CommandeItem } from './commandes/commande-item.entity';
import { CommandesModule } from './commandes/commandes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveStaticOptions: { index: false },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Parfum, Commentaire, Annonce, Offre, AjoutParfum, Contacts, Panier, Notification, FamilleOlfactives, Commande, CommandeItem],
      synchronize: true
    }),
    UsersModule,
    ParfumsModule,
    CommentairesModule,
    AnnoncesModule,
    OffresModule,
    ContactsModule,
    PanierModule,
    AjoutParfumModule,
    ContactsModule,
    NotificationModule,
    FamilleOlfactivesModule,
    CommandesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
