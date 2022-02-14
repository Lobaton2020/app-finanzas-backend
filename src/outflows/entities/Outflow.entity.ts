import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { OutflowType } from "./OutflowType.entity";
import { Category } from "./Category.entity";
import { AbstractEntity } from "src/common/entities/AbstractEntity.entity";
import { User } from "src/users/entities/User.entity";
import { Deposit } from "src/inflows/entities/Deposit.entity";

@Entity("outflows")
export class Outflow extends AbstractEntity{

    @Column({ type: "float"})
    amount:number;

    @Column({ type: "mediumtext",nullable:true})
    description:string;

    @Column({ type: "timestamp"})
    setDate:Date;

    @Column({ type:"boolean",default:true })
    status:boolean;

    @JoinColumn()
    @ManyToOne((_) => Category, (category) => category.outflows, { nullable:true})
    category: Category;

    @JoinColumn()
    @ManyToOne((_) => User, (user) => user.outflows, { nullable:false})
    user: User;

    @JoinColumn()
    @ManyToOne((_) => Deposit, (deposit) => deposit.outflows, { nullable:false})
    deposit: Deposit;

    @JoinColumn()
    @ManyToOne((_) => OutflowType, (outflowtype) => outflowtype.outflows, { nullable:false})
    outflowtype: OutflowType;


}