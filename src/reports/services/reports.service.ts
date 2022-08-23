import { Injectable } from '@nestjs/common';
import { IReportService } from 'src/outflows/interfaces/report.interface';
import { InflowsReportService } from './inflows-report.service';
import { OutflowsReportService } from './outflows-report.service';

@Injectable()
export class ReportsService implements IReportService {
  constructor(
    public readonly inflowsReportService: InflowsReportService,
    public readonly outflowsReportService: OutflowsReportService,
  ) {}

  async isQuantityAvailable(
    userId: number,
    depositId: number,
    amount: number,
  ): Promise<boolean> {
    const results = await Promise.all([
      this.outflowsReportService.getAllMoneyByDepositId(userId, depositId),
      this.inflowsReportService.getAllMoneyByDepositId(userId, depositId),
    ]);
    const [[{ total: amountOutflows }], [{ total: amountInflows }]] = results;
    return amountInflows - amountOutflows >= amount;
  }
}
