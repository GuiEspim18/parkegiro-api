import { Photo } from "src/photo/entities/photo.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

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
    street: string;

    @Column()
    state: string;

    @Column()
    city: string;

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

    @OneToOne(() => Photo, photo => photo.admin, {eager: true, onDelete: "CASCADE", nullable: true, })
    photo: Photo;

    @Column()
    notifications: number;

    @OneToMany(() => User, user => user.admin)
    user: Array<User>

    @Column()
    lastAccess: Date;
}
