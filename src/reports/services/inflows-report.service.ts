import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inflow } from 'src/inflows/entities/Intflow.entity';
import { Connection, Repository } from 'typeorm';

/**
 * @note Inflowed meand ingress
 */
@Injectable()
export class InflowsReportService {
  private status: number = 1;
  constructor(
    private connection: Connection,
    @InjectRepository(Inflow)
    private readonly inflowRepository: Repository<Inflow>,
  ) {}

  /**
   * @description Only return a object with the deposit
   */
  getAllMoneyByDeposit(userId: number, depositStatus: number = 1) {
    const query = `
        SELECT d.*, COALESCE(sum(i.total * (ip.porcentNumber / 100)),0) AS total  FROM deposits AS d
        LEFT JOIN inflow_deposit AS ip ON ip.depositId = d.id
        LEFT JOIN inflows AS i ON ip.inflowId = i.id  WHERE d.userId = ? AND d.status = ? AND i.status = ?
        GROUP BY d.id ORDER BY ip.depositId ASC;`;
    const params = [userId, depositStatus, this.status];
    return this.connection.manager.query(query, params);
  }

  async getAllMoneyByDepositId(
    userId: number,
    depositId: number,
    depositStatus: number = 1,
  ) {
    const query = `
        SELECT d.*, COALESCE(sum(i.total * (ip.porcentNumber / 100)),0) AS total  FROM deposits AS d
        LEFT JOIN inflow_deposit AS ip ON ip.depositId = d.id
        LEFT JOIN inflows AS i ON ip.inflowId = i.id  WHERE d.userId = ? AND d.status = '?' AND i.status = ?
        AND d.id = ?;`;
    const params = [userId, depositStatus, this.status, depositId];
    return this.connection.manager.query(query, params);

  }

  count(userId: number, status: number = 1) {
    return this.inflowRepository.count({ where: { user: userId, status } });
  }
}
