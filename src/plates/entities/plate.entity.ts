import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Plate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    plate: string

    @Column()
    brand: string

    @Column()
    model: string

    @Column()
    color: string
    
}
