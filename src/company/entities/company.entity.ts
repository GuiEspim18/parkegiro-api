import { Admin } from "src/admin/entities/admin.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    cnpj: string

    @Column()
    email: string

    @Column()
    phone: string

    @OneToOne( ()=> Admin, admin => admin.company )
    @JoinColumn()
    admin: Admin

}
