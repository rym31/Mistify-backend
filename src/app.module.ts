import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ParfumsModule } from './parfums/parfums.module';
import { Parfum } from './parfums/parfum.entity';
 
@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database : 'db.sqlite',
    entities : [User,Parfum],
    synchronize : true
  }),UsersModule, ParfumsModule],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
 