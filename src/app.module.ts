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
<<<<<<< HEAD
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ContactsModule } from './contacts/contacts.module';
import { Contacts } from './contacts/contacts.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type:'sqlite',
      database : 'db.sqlite',
      entities : [User,Parfum, Commentaire,Annonce, Offre, Contacts],
      synchronize : true
    }),
    UsersModule,
    ParfumsModule,
    CommentairesModule,
    AnnoncesModule,
    OffresModule,
    ContactsModule
  ],
  controllers: [AppController],
=======
import { AjoutParfum } from './ajoutParfum/ajoutParfum.entity';
import { AjoutParfumModule } from './ajoutParfum/ajoutParfum.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database : 'db.sqlite',
    entities : [User,Parfum, Commentaire,Annonce, Offre, AjoutParfum],
    synchronize : true
  }),UsersModule, ParfumsModule, CommentairesModule, AnnoncesModule, OffresModule, AjoutParfumModule],
  controllers: [AppController, ],
>>>>>>> dee21a8a646b9d51b06cc18cd1d0de6be3a2caaa
  providers: [AppService],
})
export class AppModule {}
 