import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { User } from 'src/users/entities/User.entity';
import { UsersService } from 'src/users/services/users.service';
import { Connection, Repository } from 'typeorm';
import { CreateInflowDto, IInflowPorcent } from '../dto/create-inflow.dto';
import { UpdateInflowDto } from '../dto/update-inflow.dto';
import { Deposit } from '../entities/Deposit.entity';
import { InflowDeposit } from '../entities/InflowDeposit.entity';
import { Inflow } from '../entities/Intflow.entity';
import { InflowType } from '../entities/IntflowType.entity';

enum messagesError {
  USER_NOT_FOUND = 'The user not exists',
  INFLOW_TYPE_NOT_FOUND = 'The inflowType not exists',
  DATABASE_ERROR = 'Failed on database process, to create Inflow'
}

@Injectable()
export class InflowsService {
  private readonly logger: Logger = new Logger(InflowsService.name);
  constructor(
    @InjectRepository(Inflow) private readonly inflowsRepository: Repository<Inflow>,
    @InjectRepository(InflowType) private readonly inflowsTypeRepository: Repository<InflowType>,
    @InjectRepository(Deposit) private readonly depositRepository: Repository<Deposit>,
    @InjectRepository(InflowDeposit) private readonly inflowDepositRepository: Repository<InflowDeposit>,
    private  connection: Connection,
    private readonly userService: UsersService
) {

}

  async findAll(userId, page: Pagination) {
    const opts = {
      relations:["inflowtype","user","inflowdeposits"],
      ...page,
      where:{
        user: userId
      }
    };
    const inflow = await this.inflowsRepository.find(opts);
    const inflows = await inflow.map((data)=>this.handleInflow(data));
    return await Promise.all(inflows);
  }
  async findOne(userId, id: number) { // ajustar
    const opts = {
      relations:["inflowtype","user","inflowdeposits"],
      where:{
        user: userId,
        id
      }
    };
    const inflow = await this.inflowsRepository.findOne(opts);
    if(!inflow){
        throw new NotFoundException("The inflow not exists")
    }
    return await this.handleInflow(inflow);
  }

  async create(userId:number, inflowIn:CreateInflowDto){
    const { description, inflowTypeId, total, setDate, porcents  } = inflowIn;
    this.validateSumPercents(porcents)
    const inflowType = await this.inflowsTypeRepository.findOne({ id: inflowTypeId });
    if(!inflowType){
        throw new BadRequestException(messagesError.INFLOW_TYPE_NOT_FOUND)
    }
    /**
     * It should validate if the user is active or not, Or simply verify the user flow to access here
     * Ask to Daniel about how validate allS
    */
    const user = await this.userService.findOne({ id: userId });
    if(!user){
        throw new BadRequestException(messagesError.USER_NOT_FOUND)
    }
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try{
        const inflow = new Inflow();
        inflow.inflowtype = inflowType;
        inflow.description = description;
        inflow.total = total
        inflow.setDate = setDate;
        inflow.user = user
        const inflowSaved = await queryRunner.manager.save(inflow)
        const porcentsSaved = [];
        for(let porcent of porcents){
          const { id } =  await queryRunner.manager.save(await this.prepareInflowDeposit(porcent,inflowSaved, user))
          porcentsSaved.push({...porcent, inflowDepositId: id}) // inflowDepositId is equal than porcentId
        }
        await queryRunner.commitTransaction();
        this.logger.debug("Se realiza transaccion para nueva entrada de dinero")
        return {
            id: inflowSaved.id,
            ...inflowIn,
            porcents: porcentsSaved
        };
      }catch(error){
        await queryRunner.rollbackTransaction();
        if(error instanceof BadRequestException){
          throw new BadRequestException(error.message)
        }
        this.logger.error("Fail to create inflow, general process", error)
        throw new InternalServerErrorException(messagesError.DATABASE_ERROR)
      }finally {
        await queryRunner.release();
      }
  }
  async update(userId:number,inflowId:number,  inflowIn:UpdateInflowDto){
    const { description, inflowTypeId, total, setDate, porcents  } = inflowIn;
    this.validateSumPercents(porcents)
    const user = await this.userService.findOne({ id: userId });
    if(!user){
      throw new BadRequestException(messagesError.USER_NOT_FOUND)
    }
    const inflowType = await this.inflowsTypeRepository.findOne({ where:{ id: inflowTypeId, user } });
    if(!inflowType){
        throw new BadRequestException(messagesError.INFLOW_TYPE_NOT_FOUND)
    }
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try{
        const inflow = await this.inflowsRepository.findOne({ where:{ id: inflowId, user } });
        if(!inflow){
            throw new BadRequestException(`This inflow by id ${inflowId} doesn't exists`)
        }
        inflow.inflowtype = inflowType;
        inflow.description = description;
        inflow.total = total
        inflow.setDate = setDate;
        inflow.user = user
        const inflowSaved = await queryRunner.manager.save(inflow)
        for(let porcent of porcents){
            await queryRunner.manager.save(await this.prepareInflowDepositUpdate(porcent, inflowSaved, porcent.inflowDepositId, user))
        }
        await queryRunner.commitTransaction();
        this.logger.debug("Se realiza transaccion para nueva entrada de dinero")
        return inflowIn;
      }catch(error){
        await queryRunner.rollbackTransaction();
        if(error instanceof BadRequestException){
          throw new BadRequestException(error.message)
        }
        this.logger.error("Fail to create inflow, general process", error)
        throw new InternalServerErrorException(messagesError.DATABASE_ERROR)
      }finally {
        await queryRunner.release();
      }
  }
  private async prepareInflowDepositUpdate(porcent:IInflowPorcent,inflow:Inflow, porcentId?: number, user?: User){
    const deposit:Deposit = await this.depositRepository.findOne({ where:{ id: porcent.depositId, user} })
    if(!deposit){
      throw new BadRequestException("The deposit not exists")
    }
    const inflowDeposit:InflowDeposit = await this.inflowDepositRepository.findOne({ where: { id: porcentId, deposit, inflow } })
    if(!inflowDeposit){
      throw new BadRequestException("The inflowDeposit doesn't exists")
  }

    inflowDeposit.porcentNumber = porcent.porcent
    inflowDeposit.deposit = deposit
    inflowDeposit.inflow = inflow
    return inflowDeposit
  }
  //Get the deposits where the bologs to the inflowDeposit, intermediate table
  private async getDeposits(inflowdeposits){
    const handleGetDeposits= async ({ id,...rest })=> {
      const inflowDeposit = await this.inflowDepositRepository.findOne({
        where: { id },
        relations:["deposit"]
      });
      return {
          deposit: await this.depositRepository.findOne(inflowDeposit.deposit.id) || {},
          inflowdeposits: { id, ...rest }
      };
    }
    return inflowdeposits.map(handleGetDeposits);
  };
  private async handleInflow ({ inflowdeposits,...rest }){
    const inflowDepositsArrayPromise = await this.getDeposits(inflowdeposits);
    const deposits = await Promise.all(inflowDepositsArrayPromise);
    return {
      ...rest,
      deposits
    };
  }
  private async prepareInflowDeposit(porcent:IInflowPorcent,inflow:Inflow, user:User){
    const deposit:Deposit = await this.depositRepository.findOne({ id: porcent.depositId, user })
    if(!deposit){
        throw new BadRequestException("The deposit not exists")
    }

    const inflowDeposit:InflowDeposit = new InflowDeposit()
    inflowDeposit.porcentNumber = porcent.porcent
    inflowDeposit.deposit = deposit
    inflowDeposit.inflow = inflow
    return inflowDeposit
  }
  private validateSumPercents(porcents:IInflowPorcent[]){
    porcents.forEach(({ porcent, depositId }) =>{
      if(!porcent || !depositId){
          throw new BadRequestException("Please send in a correct way the porcent and the depositId")
      }
    })
    const sumPorcents = porcents.map(({ porcent })=> porcent).reduce((prev,curr)=>  prev  + curr ,0);
    if(sumPorcents !== 100){
        throw new BadRequestException("The sum of the porcent must be equal to 100")
    }
  }
}
