import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { PhotoModule } from 'src/photo/photo.module';
import { Photo } from 'src/photo/entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Photo]), PhotoModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
