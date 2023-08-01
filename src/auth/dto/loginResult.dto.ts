import { CreateUserDto } from "src/users/dto/create-user.dto";

export class LoginResultDto {
    user: Partial<CreateUserDto>;
    token: string;
}