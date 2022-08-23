import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Traceability } from '../common/entities/Traceability.entity';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Traceability ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, PaginationService]
})
export class AdminModule {}
