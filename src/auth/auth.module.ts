import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ]),
        PassportModule,
        JwtModule.register({
            secret: '123',
            signOptions: {
                expiresIn: "30d"
            }
        })
    ],
    providers: [AuthService],
    exports: [AuthModule]
})
export class AuthModule { }
