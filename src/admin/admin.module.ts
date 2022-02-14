import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Traceability } from './entities/Traceability.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Traceability ]),
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
