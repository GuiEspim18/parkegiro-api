import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { PhotoModule } from 'src/photo/photo.module';
import { Photo } from 'src/photo/entities/photo.entity';
import { Company } from 'src/company/entities/company.entity';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Photo, Company]), PhotoModule, CompanyModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
