import { Body, Controller, Param, Patch } from "@nestjs/common";
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

    @Patch('login/:id')
    public login(@Body() data: any, @Param('id') id: number): Promise<LoginResultDto> {
        console.log(id)
        return this.authService.login(id, data);
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