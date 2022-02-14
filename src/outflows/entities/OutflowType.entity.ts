import { Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { Outflow } from "./Outflow.entity";
import { Category } from "./Category.entity";
import { AbstractEntity } from "src/common/entities/AbstractEntity.entity";
import { User } from "src/user/entities/User.entity";

@Entity("outflowtypes")
export class OutflowType extends AbstractEntity{

    @Column()
    name:string = "";

    @Column({ type:"boolean",default:true })
    status:boolean;

    @OneToMany(() => Outflow, (outflow) => outflow.outflowtype)
    outflows: Outflow[]

    @OneToMany((_)=>Category, (category)=>category.outflowtype)
    categories:Category[];

    @JoinColumn()
    @ManyToOne((_)=>User, (user)=>user.outflowtypes, { nullable:true})
    user:User;

}