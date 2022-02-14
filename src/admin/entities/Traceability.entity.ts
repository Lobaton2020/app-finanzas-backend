import { AbstractEntity } from "src/common/entities/AbstractEntity.entity";
import { User } from "src/users/entities/User.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("traceabilities")
export class Traceability extends AbstractEntity{

    @Column({ type:"json"})
    agent:any

    @Column({ type:"varchar"})
    clientIp:string;


    @Column({ type:"varchar"})
    requestId:string

    @Column({ type:"varchar"})
    endpoint:string;

    @Column({ type:"varchar"})
    httpMethod:string;

    @JoinColumn()
    @ManyToOne((_) => User, (user) => user.traceabilities,{ nullable:true })
    user: User;

}