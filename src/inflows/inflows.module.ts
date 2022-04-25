import { Module } from '@nestjs/common';
import { InflowsService } from './services/inflows.service';
import { InflowsController } from './controllers/inflows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inflow } from './entities/Intflow.entity';
import { InflowDeposit } from './entities/InflowDeposit.entity';
import { InflowType } from './entities/IntflowType.entity';
import { Deposit } from './entities/Deposit.entity';
import { User } from 'src/users/entities/User.entity';
import { InflowsTypeController } from './controllers/inflows-type.controller';
import { InflowsTypeService } from './services/inflows-type.service';
import { UsersModule } from 'src/users/users.module';
import { DepositsController } from './controllers/deposits.controller';
import { DepositsService } from './services/deposits.service';

@Module({
  imports:[
    UsersModule,
    TypeOrmModule.forFeature([Inflow,InflowDeposit,InflowType, Deposit,User]),
  ],
  controllers: [InflowsController, InflowsTypeController, DepositsController],
  providers: [InflowsTypeService,InflowsService, DepositsService]
})
export class InflowsModule {}
