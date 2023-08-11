import { Admin } from "src/admin/entities/admin.entity";

export class CreateCompanyDto {
    id: number;
    name: string;
    cnpj: string;
    phone: string;
    email: string;
    admin: Admin;

    constructor(name: string, cnpj: string, phone: string, email: string, adminId?: number) {
        this.name = name;
        this.cnpj = cnpj;
        this.phone = phone;
        this.email = email;
        this.admin = new Admin()
        this.admin.id = adminId;
    }
}
