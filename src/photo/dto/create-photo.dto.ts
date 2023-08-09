import { Admin } from "src/admin/entities/admin.entity";
import { User } from "src/users/entities/user.entity";

export class CreatePhotoDto {
    id?: number;
    url: string;
    name: string;
    originName: string;
    user?: User;
    admin?: Admin;

    constructor(url: string, name: string, originName: string, userId?: number, adminId?: number) {
        this.url = url;
        this.name = name;
        this.originName = originName;
        this.user = new User();
        this.user.id = userId;
        this.admin = new Admin();
        this.admin.id = adminId
    }
}
