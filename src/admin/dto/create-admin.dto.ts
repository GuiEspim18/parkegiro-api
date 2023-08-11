import { Company } from "src/company/entities/company.entity";
import { Photo } from "src/photo/entities/photo.entity";

export class CreateAdminDto {
    id: number;
    username: string;
    name: string;
    surname: string;
    cpf: string;
    birthdate: string;
    zipCode: string;
    street: string;
    state: string;
    city: string;
    number: string;
    compliment: string;
    cellphone: string;
    telephone: string;
    email: string;
    password: string;
    photo: Photo;
    notifications: number;
    lastAccess: Date;
    company: Company
}
