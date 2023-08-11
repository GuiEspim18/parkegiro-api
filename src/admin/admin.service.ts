import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import * as fs from "fs";
import { Photo } from 'src/photo/entities/photo.entity';
import { CreatePhotoDto } from 'src/photo/dto/create-photo.dto';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>,
  ) { }


  /** 
   * Method to create an admin on database
   * @param data 
   * @returns Promise<CreateUserDto>
   */

  public async create(data: CreateAdminDto): Promise<CreateAdminDto & Admin> {
    if (data) {
      delete data.company;
      const exists: CreateAdminDto = await this.adminRepository.findOne({ where: { email: data.email } });
      if (exists) throw new HttpException("Usuário já cadastrado!", 500);
      data.password = await bcrypt.hash(data.password, 12);
      const admin: CreateAdminDto = this.adminRepository.create(data);
      return await this.adminRepository.save(admin);
    }
    throw new HttpException("You need to provide a user", 500);
  }


  /** 
   * Method to find all admins on database
   * @returns Promise<Array<CreateUserDto>>
   */

  public async findAll(): Promise<Array<CreateAdminDto>> {
    return await this.adminRepository.find({ relations: ['photo', 'user', 'company'] });
  }


  /** 
   * Method to find one admin on database
   * @param id
   * @returns Promise<Array<CreateUserDto>>
   */

  public async findOne(id: number) {
    if (id && Number(id)) {
      const admin: CreateAdminDto = await this.adminRepository.findOne({ where: { id: id },relations: ['photo', 'user', 'company'] });
      if (admin) return admin;
      throw new HttpException("None user found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }


  /** 
   * Method to update an admin on database
   * @param id
   * @param data
   * @returns Promise<CreateUserDto & User>
   */

  public async update(id: number, data: UpdateAdminDto): Promise<CreateAdminDto & Admin> {
    if (id && Number(id)) {
      const admin: CreateAdminDto = await this.adminRepository.findOne({ where: { id: id } });
      if (admin) {
        const photo: CreatePhotoDto = await this.photoRepository.findOne({ where: { admin: { id: admin.id } } });
        const saved: CreateAdminDto & Admin = await this.adminRepository.save({ id, ...admin, ...data });
        if (!photo.admin) await this.photoRepository.delete(photo.id)
        return saved;
      }
      throw new HttpException("None user found", 500)
    }
    throw new HttpException("You need to provide a valid id", 500);
  }


  /** 
   * Method to remove an admin on database
   * @param id
   * @returns Promise<DeleteResult>
   */

  public async remove(id: number): Promise<DeleteResult> {
    if (id && Number(id)) {
      const admin: CreateAdminDto = await this.adminRepository.findOne({ where: { id: id }, relations: ['photo'] });
      if (admin.photo) fs.unlinkSync(admin.photo.url);
      if (admin) return await this.adminRepository.delete(id);
      throw new HttpException("None user found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }
}
