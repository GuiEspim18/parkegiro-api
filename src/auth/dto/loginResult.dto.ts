import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class LoginResultDto {
    user?: Partial<CreateUserDto>;
    admin?: Partial<CreateAdminDto>;
    token: string;
}