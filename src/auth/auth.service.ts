import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PlayLoadDto } from './dto/playload.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/userLogin.dto';
import { LoginResultDto } from './dto/loginResult.dto';
import { JwtStrategy } from './jwt/jwt.strategy';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly jwtStrategy: JwtStrategy
    ) { }


    /** 
     * Method to execute the user login
     * @param data
     * @returns Promise<LoginResultDto>
     */

    public async loginUser(data: UserLoginDto): Promise<LoginResultDto> {
        const email: string = data.email;
        const userFound: CreateUserDto = await this.userRepository.findOne({ where: { email: email }, select: ['username', 'email', 'password', 'id'] });
        if (userFound) {
            const pw = await this.comparePw(data.password, userFound.password);
            if (pw) {
                const playLoad: PlayLoadDto = await this.jwtStrategy.validate(userFound);
                const token = this.jwtService.sign(playLoad);
                const { password, ...user } = userFound;
                return { user, token };
            }
            throw new HttpException("Senha incorreta!", 500);
        }
        throw new HttpException("Usuário não cadastrado!", 500);
    }


    /** 
     * Method to compare the password with attempt
     * @param att
     * @param pw
     * @returns Promise<boolean>
     */

    private async comparePw(att: string, pw: string): Promise<boolean> {
        return await bcrypt.compare(att, pw);
    }


    /** 
     * Method to verify sent token
     * @param data
     * @returns Promise<boolean>
     */

    public async verify(data: any): Promise<boolean> {
        const param: string = data.headers.Authorization.replace("Bearer ", "");
        if (param === "null") return false
        const token: any = this.jwtService.verify(param);
        if (token) return true;
        return false;
    }

}
