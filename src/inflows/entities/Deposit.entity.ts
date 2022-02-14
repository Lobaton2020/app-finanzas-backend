import { AbstractEntity } from "src/common/entities/AbstractEntity.entity";
import { Outflow } from "src/outflows/entities/Outflow.entity";
import { User } from "src/user/entities/User.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { InflowDeposit } from "./InflowDeposit.entity";

@Entity("deposits")
export class Deposit extends AbstractEntity{
    @Column()
    name:string;

    @Column({ type:"boolean",default:true })
    status:boolean;

    @JoinColumn()
    @ManyToOne(() => User, (user) => user.deposits)
    user: User;

    @OneToMany(()=>InflowDeposit,(inflowdeposit)=>inflowdeposit.deposit)
    inflowdeposits:InflowDeposit[]

    @OneToMany(()=>Outflow,(outflows)=>outflows.deposit)
    outflows:Outflow[]

}