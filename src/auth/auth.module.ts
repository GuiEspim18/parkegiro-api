import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Admin
        ]),
        PassportModule,
        JwtModule.register({
            secret: '123',
            signOptions: {
                expiresIn: "30d"
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthModule]
})
export class AuthModule { }
