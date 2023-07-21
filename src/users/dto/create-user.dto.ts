import { Photo } from "src/photo/entities/photo.entity";

export class CreateUserDto {
    id: number;
    username: string;
    name: string;
    surname: string;
    cpf: string;
    birthdate: string;
    cep: string;
    street: string;
    number: string;
    compliment: string;
    cellphone: string;
    telephone: string;
    email: string;
    password: string;
    photo: Photo;
    notifications: number
}
