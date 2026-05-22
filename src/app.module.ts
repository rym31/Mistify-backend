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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get('DB_USER', 'mistify_user'),
        password: config.get('DB_PASSWORD', ''),
        database: config.get('DB_NAME', 'mistify_db'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [User, Parfum, Commentaire, Annonce, Offre, AjoutParfum, Contacts, Panier, Notification, FamilleOlfactives, Commande, CommandeItem],
        // logging: config.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ParfumsModule,
    CommentairesModule,
    ContactsModule,
    PanierModule,
    AjoutParfumModule,
    NotificationModule,
    FamilleOlfactivesModule,
    CommandesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
