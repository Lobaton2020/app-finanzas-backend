import { Module } from '@nestjs/common';
import { OutflowsService } from './outflows.service';
import { OutflowsController } from './outflows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outflow } from './entities/Outflow.entity';
import { OutflowType } from './entities/OutflowType.entity';
import { Category } from './entities/Category.entity';
import { Deposit } from 'src/inflows/entities/Deposit.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Outflow,OutflowType,Category,Deposit])
  ],
  controllers: [OutflowsController],
  providers: [OutflowsService]
})
export class OutflowsModule {}
