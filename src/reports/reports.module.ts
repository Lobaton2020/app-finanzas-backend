import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inflow } from 'src/inflows/entities/Intflow.entity';
import { InflowsModule } from 'src/inflows/inflows.module';
import { Outflow } from 'src/outflows/entities/Outflow.entity';
import { OutflowsModule } from 'src/outflows/outflows.module';
import { ReportController } from './reports.controller';
import { InflowsReportService } from './services/inflows-report.service';
import { OutflowsReportService } from './services/outflows-report.service';
import { ReportsService } from './services/reports.service';
/**
 * This is an special module that has access directly to the repositories
*/
const ReportsServiceProvider = {
  provide: ReportsService.name,
  useClass: ReportsService,
};
@Module({
  imports: [
    forwardRef(() => OutflowsModule),
    InflowsModule,
    TypeOrmModule.forFeature([Inflow, Outflow]),
  ],
  controllers:[ReportController],
  providers: [
    InflowsReportService,
    OutflowsReportService,
    ReportsServiceProvider,
  ],
  exports: [ReportsServiceProvider],
})
export class ReportsModule {}
