import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Inflow } from 'src/inflows/entities/Intflow.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Inflow])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
