import { AbstractEntity } from "src/common/entities/AbstractEntity.entity";
import { User } from "src/users/entities/User.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("traceabilities")
export class Traceability extends AbstractEntity{

    @Column({ type:"varchar", length:255, nullable:false })
    requestId:string

    @Column({ type:"varchar", length:20,nullable:true})
    method:string;

    @Column({ type:"mediumtext",nullable:true })
    body:string;

    @Column({ type:"varchar", length:100, nullable:true })
    clientIp:string;

    @Column({ type:"mediumtext",nullable:true })
    url:string;

    @Column({ type:"mediumtext",nullable:true })
    reqHeaders:string;

    @Column({ type:"mediumtext",nullable:true })
    resHeaders:string;

    @Column({ type:"mediumtext",nullable:true })
    bodyResponse:string;

    @Column({ type:"varchar",nullable:true  })
    statusCode:string;

    @JoinColumn()
    @ManyToOne((_) => User, (user) => user.traceabilities,{ nullable:true })
    user: User;

}