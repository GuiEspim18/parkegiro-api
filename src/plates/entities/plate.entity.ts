import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ default: null, nullable: true })
    entrance: string;

    @Column({ default: null, nullable: true })
    departure: string;

    @Column({ default: 0, })
    stage: number;

    @CreateDateColumn()
    entranceDate: Date;

    @UpdateDateColumn({ nullable: true, default: null })
    departureDate: Date;

    @Column({ default: 0 })
    price: number;

}
