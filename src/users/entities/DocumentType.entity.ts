import { AbstractEntity } from "src/common/entities/AbstractEntity.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { User } from "./User.entity";

@Entity("documenttypes")
export class DocumentType extends AbstractEntity{

    @Column({type:"varchar"})
    name:string;

    @OneToMany((_)=>User,(users)=>users.documentType)
    users:User[];
}