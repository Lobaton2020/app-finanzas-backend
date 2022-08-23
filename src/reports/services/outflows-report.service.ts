import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outflow } from 'src/outflows/entities/Outflow.entity';
import { Connection, Repository } from 'typeorm';

/**
 * @note Outflowed means Egressed
 */
@Injectable()
export class OutflowsReportService {
  private status: number = 1;
  constructor(
    private connection: Connection,
    @InjectRepository(Outflow)
    private readonly outflowRepository: Repository<Outflow>,
  ) {}

  /**
   * @returns { Object[] } from Deposits
   */
  getAllMoneyByDeposit(userId: number, depositStatus: number = 1) {
    const query = `
        SELECT d.*, COALESCE(sum(outF.amount),0) AS total  FROM deposits AS d
		    LEFT JOIN outflows AS outF ON outF.depositId = d.id
        WHERE d.userId = ? AND d.status = ? AND outF.status = ?
		    GROUP BY d.id ORDER BY outF.depositId ASC;`;
    const params = [userId, depositStatus, this.status];
    return this.connection.manager.query(query, params);
  }

  /**
   * @returns { Object } from Deposit
   */
  getAllMoneyByDepositId(
    userId: number,
    depositId: number,
    depositStatus: number = 1,
  ) {
    // the outF alias mustn't be 'out' this makes an error on the query
    const query = `
        SELECT d.*, COALESCE(sum(outF.amount),0) AS total  FROM deposits AS d
    		LEFT JOIN outflows AS outF ON outF.depositId = d.id
        WHERE d.userId = ? AND d.status = '?' AND d.id = ? AND outF.status = ?;`;
    const params = [userId, depositStatus, depositId, this.status];
    return this.connection.manager.query(query, params);
  }

  count(userId: number, status: number = 1) {
    return this.outflowRepository.count({ where: { user: userId, status } });
  }
}
