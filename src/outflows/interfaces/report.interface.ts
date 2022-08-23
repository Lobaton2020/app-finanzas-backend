/**
 * @description This interface mus be implements by thr reportsService of the module service.
 * This because has a connection with this module directly
 */
export interface IReportService {
  isQuantityAvailable(userId:number, depositId:number, amount:number): Promise<boolean>;
}
