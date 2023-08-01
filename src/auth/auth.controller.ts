import { Body, Controller, Patch } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginResultDto } from "./dto/loginResult.dto";

@Controller('auth')
export class AuthController {

    constructor (private readonly authService: AuthService) { }


    /** 
     * Method to execute the login 
     * @param data
     * @returns Promise<LoginResultDto>
     */

    @Patch('login')
    public login(@Body() data: any): Promise<LoginResultDto> {
        return this.authService.loginUser(data);
    }


    /** 
     * Method to verify if token is valid
     * @param data
     * @returns Promise<boolean>
     */

    @Patch('verify')
    public verify(@Body() data: any): Promise<boolean> {
        return this.authService.verify(data)
    }

}