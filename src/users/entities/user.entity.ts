import { Photo } from "src/photo/entities/photo.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
    zipCode: string;

    @Column()
    state: string;

    @Column()
    city: string;

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

    @OneToOne(() => Photo, photo => photo.user, { eager: true, onDelete: "CASCADE", nullable: true })
    photo: Photo;

    @Column({ nullable: true })
    notifications: number;

    @Column({ nullable: true, default: null })
    lastAccess: Date;

    @CreateDateColumn()
    createdAt: Date;

}
