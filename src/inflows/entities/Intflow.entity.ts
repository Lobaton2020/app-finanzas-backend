import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { InflowType } from "./IntflowType.entity";
import { InflowDeposit } from "./InflowDeposit.entity";
import { AbstractEntity } from "src/common/entities/AbstractEntity.entity";
import { User } from "src/user/entities/User.entity";

@Entity("inflows")
export class Inflow extends AbstractEntity{
    @Column({ type: "float"})
    total:number;

    @Column({ type: "mediumtext", nullable:true})
    description:string;

    @Column({ type: "timestamp"})
    setDate:Date;

    @Column({ type:"boolean",default:true })
    status:boolean;

    @JoinColumn()
    @ManyToOne((_) => User, (user) => user.inflows,{ nullable:false })
    user: User;

    @JoinColumn()
    @ManyToOne((_) => InflowType, (inflowtype) => inflowtype.inflows, { nullable:false})
    inflowtype: InflowType;

    @OneToMany(()=>InflowDeposit,(inflowdeposit)=>inflowdeposit.inflow)
    inflowdeposits:InflowDeposit[]

}