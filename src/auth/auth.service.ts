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

@Injectable()
export class AuthService {

    constructor (
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}


    /** 
     * Method to execute the user login
     * @param data
     * @returns Promise<LoginResultDto>
     */

    public async loginUser(data: UserLoginDto): Promise<LoginResultDto> {
        const email: string = data.email;
        const user: CreateUserDto = await this.userRepository.findOne({ where: { email: email } });
        if (user) {
            const pw = await this.comparePw(data.password, user.password);
            if (pw) {
                const playLoad: PlayLoadDto = {
                    id: user.id,
                    username: user.username,
                    passoword: user.password
                };
                const token = this.jwtService.sign(playLoad);
                const { password, ...result } = user;
                return { result, token }
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

}
