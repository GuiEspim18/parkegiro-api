import { Admin } from "src/admin/entities/admin.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    name: string;

    @Column()
    originName: string

    @OneToOne(() => User, user => user.photo, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: 'user' })
    user: User;

    @OneToOne(() => Admin, admin => admin.photo, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "admin" })
    admin: Admin;
}
