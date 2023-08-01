import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  /** 
   * Method to create an user on database
   * @param data 
   * @returns Promise<CreateUserDto>
   */

  @UseGuards(JwtAuthGuard)
  @Post()
  public create(@Body() data: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(data);
  }


  /** 
   * Method to find all users on database
   * @returns Promise<Array<CreateUserDto>>
   */

  @UseGuards(JwtAuthGuard)
  @Get()
  public findAll(): Promise<Array<CreateUserDto>> {
    return this.usersService.findAll();
  }


  /** 
   * Method to find one user on database
   * @param id
   * @returns Promise<Array<CreateUserDto>>
   */

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<CreateUserDto> {
    return this.usersService.findOne(+id);
  }


  /** 
   * Method to update an user on database
   * @param id
   * @param data
   * @returns Promise<CreateUserDto & User>
   */

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<CreateUserDto & User> {
    return this.usersService.update(+id, data);
  }


  /** 
   * Method to remove an user on database
   * @param id
   * @returns Promise<DeleteResult>
   */

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.remove(+id);
  }
}
