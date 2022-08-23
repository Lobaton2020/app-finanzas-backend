import { Body, Controller, Get, Req, UseGuards, Inject } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessAdminOrUser } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import reportsRouter from './reports.router';
import { ReportsService } from './services/reports.service';

@ApiBearerAuth()
@Controller(reportsRouter.reports.path)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportController {
  constructor(@Inject(ReportsService.name) private readonly reportService: ReportsService) {}

  @Get('resume')
  @AccessAdminOrUser()
  async resume(@Req() req) {
    const id = req.user.userId;
    const ingress = await this.reportService.inflowsReportService.getAllMoneyByDeposit(id);
    const egress = await this.reportService.outflowsReportService.getAllMoneyByDeposit(id);

    const totalEgress = this.sumPropertyFromObject(egress, 'total');
    const totalIngress = this.sumPropertyFromObject(ingress, 'total');

    return {
      totalEgress,
      totalIngress,
      remainingMoney: totalIngress - totalEgress,
      countIngress: await this.reportService.inflowsReportService.count(id),
      countEgress: await this.reportService.outflowsReportService.count(id),
    };
  }
  private sumPropertyFromObject(objects: any[], propertie: string) {
    return objects?.reduce((ac, actual) => ac + actual[propertie], 0);
  }
}
