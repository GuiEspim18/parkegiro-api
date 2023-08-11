import { Company } from "src/company/entities/company.entity";

export class PlayLoadDto {
    id: Number;
    username: string;
    company: Company
}