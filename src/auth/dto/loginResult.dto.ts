import { CreateUserDto } from "src/users/dto/create-user.dto";

export class LoginResultDto {
    result: Partial<CreateUserDto>;
    token: string;
}