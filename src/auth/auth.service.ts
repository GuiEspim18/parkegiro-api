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
import { AdminLoginDto } from './dto/adminLogin.dto';
import { Admin } from 'src/admin/entities/admin.entity';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
        private readonly jwtService: JwtService,
        private readonly jwtStrategy: JwtStrategy
    ) { }


    /** 
     * Method to indetify if is user or admin login
     * @param type
     * @param data
     */


    public login(type: number, data: UserLoginDto | AdminLoginDto) {
        if (Number(type) === 0) return this.loginAdmin(data);
        return this.loginUser(data);
    }



    /** 
     * Method to execute the admin login
     * @param data
     * @returns Promise<LoignAdminDto>
     */

    private async loginAdmin(data: AdminLoginDto): Promise<LoginResultDto> {
        const email: string = data.email;
        const adminFound: CreateAdminDto = await this.adminRepository.findOne({ where: { email: email }, select: ['username', 'email', 'password', 'id'], relations: ['company'] });
        if (adminFound) {
            const pw = await this.comparePw(data.password, adminFound.password);
            if (pw) {
                const playLoad: PlayLoadDto = await this.jwtStrategy.validate(adminFound);
                const token = this.jwtService.sign(playLoad);
                delete adminFound.password;
                const { password, ...admin } = adminFound;
                const logged: CreateAdminDto = adminFound;
                logged.lastAccess = new Date();
                const id: number = adminFound.id;
                await this.adminRepository.save({ id, ...adminFound, ...logged  });
                return { admin, token };
            }
            throw new HttpException("Senha incorreta!", 500);
        }
        throw new HttpException("Usuário não cadastrado!", 500);
    }


    /** 
     * Method to execute the user login
     * @param data
     * @returns Promise<LoginResultDto>
     */

    public async loginUser(data: UserLoginDto): Promise<LoginResultDto> {
        const email: string = data.email;
        const userFound: CreateUserDto = await this.userRepository.findOne({ where: { email: email }, select: ['username', 'email', 'password', 'id'], relations: ['company'] });
        if (userFound) {
            const pw = await this.comparePw(data.password, userFound.password);
            if (pw) {
                const playLoad: PlayLoadDto = await this.jwtStrategy.validate(userFound);
                const token = this.jwtService.sign(playLoad);
                delete userFound.password;
                const { password, ...user } = userFound;
                const logged: CreateUserDto = userFound;
                logged.lastAccess = new Date();
                const id: number = userFound.id;
                await this.userRepository.save({ id, ...userFound, ...logged  });
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
