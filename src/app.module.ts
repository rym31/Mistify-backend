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
@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database : 'db.sqlite',
    entities : [User,Parfum, Commentaire],
    synchronize : true
  }),UsersModule, ParfumsModule, CommentairesModule],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
 