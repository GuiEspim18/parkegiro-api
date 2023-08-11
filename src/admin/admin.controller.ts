import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CompanyService } from 'src/company/company.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /** 
   * Method to create an admin on database
   * @param data 
   * @returns Promise<CreateUserDto>
   */

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }


  /** 
   * Method to find all admins on database
   * @returns Promise<Array<CreateUserDto>>
   */

  @Get()
  public findAll() {
    return this.adminService.findAll();
  }


  /** 
   * Method to find one admin on database
   * @param id
   * @returns Promise<Array<CreateUserDto>>
   */

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }


  /** 
   * Method to update an admin on database
   * @param id
   * @param data
   * @returns Promise<CreateUserDto & User>
   */

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }


  /** 
   * Method to remove an admin on database
   * @param id
   * @returns Promise<DeleteResult>
   */

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
