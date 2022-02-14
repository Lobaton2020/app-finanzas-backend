import { AbstractEntity } from "src/common/entities/AbstractEntity.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Deposit } from "./Deposit.entity";
import { Inflow } from "./Intflow.entity";

@Entity("inflow_deposit")
export class InflowDeposit extends AbstractEntity{

    @Column({ type:"boolean",default:true })
    status:boolean;

    @Column({ type:"bigint"})
    porcentNumber:number;

    @JoinColumn()
    @ManyToOne(() => Deposit, (deposit) => deposit.inflowdeposits, { nullable:false })
    deposit: Deposit;

    @JoinColumn()
    @ManyToOne(() => Inflow, (inflow) => inflow.inflowdeposits, { nullable:false })
    inflow: Inflow;


}