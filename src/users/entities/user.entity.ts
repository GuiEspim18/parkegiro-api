import { Photo } from "src/photo/entities/photo.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    cpf: string;

    @Column()
    birthdate: string;

    @Column()
    cep: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    compliment: string;

    @Column()
    cellphone: string;

    @Column()
    telephone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Photo)
    @JoinColumn({ name: 'photo' })
    photo: Photo;

    @Column()
    notifications: number

}
