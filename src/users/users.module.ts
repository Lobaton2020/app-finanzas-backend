import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { RolsController } from './controllers/rols.controller';
import { UsersController } from './controllers/users.controller';
import { RolsService } from './services/rols.service';
import { Rol } from './entities/Rol.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Rol])
  ],
  controllers: [UsersController, RolsController],
  providers: [UsersService, RolsService]
})
export class UsersModule {}
