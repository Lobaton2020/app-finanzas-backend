import { Column, Entity, JoinColumn, ManyToMany, ManyToOne} from "typeorm";
import { AbstractEntity } from "src/common/entities/AbstractEntity.entity";
import { User } from "src/users/entities/User.entity";
import { Outflow } from "./Outflow.entity";

@Entity("tags")
export class Tag extends AbstractEntity{

    @Column()
    name:string;

    @Column({ type:"boolean", default:true })
    status:boolean;

    @JoinColumn()
    @ManyToOne((_) => User, (user) => user.tags,{ nullable:false })
    user: User;

    @ManyToMany(() => Outflow, (outflow) => outflow.tags)
    outflows:Outflow[];
}