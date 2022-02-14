import { AbstractEntity } from "src/common/entities/AbstractEntity.entity";
import { User } from "src/users/entities/User.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { Inflow } from "./Intflow.entity";

@Entity("inflowtypes")
export class InflowType extends AbstractEntity{

    @Column()
    name:string = "";

    @Column({ type:"boolean",default:true })
    status:boolean;

    @OneToMany(() => Inflow, (inflow) => inflow.inflowtype)
    inflows: Inflow[]

    @JoinColumn()
    @ManyToOne((_)=>User, (user)=>user.inflowtypes, { nullable:true})
    user:User;
}