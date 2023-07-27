import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo]), PhotoModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
