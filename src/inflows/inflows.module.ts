import { Module } from '@nestjs/common';
import { InflowsService } from './inflows.service';
import { InflowsController } from './inflows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inflow } from './entities/Intflow.entity';
import { InflowDeposit } from './entities/InflowDeposit.entity';
import { InflowType } from './entities/IntflowType.entity';
import { Deposit } from './entities/Deposit.entity';
import { User } from 'src/users/entities/User.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Inflow,InflowDeposit,InflowType, Deposit,User])
  ],
  controllers: [InflowsController],
  providers: [InflowsService]
})
export class InflowsModule {}
