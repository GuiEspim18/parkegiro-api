import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor (
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }


  /** 
   * Method to create an user on database
   * @param data 
   * @returns Promise<CreateUserDto>
   */

  public async create(data: CreateUserDto): Promise<CreateUserDto> {
    if (data) {
      const exists: CreateUserDto = await this.userRepository.findOne({ where: { email: data.email } });
      if (exists) throw new HttpException("Usuário já cadastrado", 500);
      data.password = await bcrypt.hash(data.password, 12)
      const user: CreateUserDto = this.userRepository.create(data);
      return await this.userRepository.save(user);
    }
    throw new HttpException("You need to provide a user", 500);
  }


  /** 
   * Method to find all users on database
   * @returns Promise<Array<CreateUserDto>>
   */

  public async findAll(): Promise<Array<CreateUserDto>> {
    return await this.userRepository.find({relations: ['photo']});
  }


  /** 
   * Method to find one user on database
   * @param id
   * @returns Promise<Array<CreateUserDto>>
   */

  public async findOne(id: number): Promise<CreateUserDto> {
    if (id && Number(id)) {
      const user: CreateUserDto = await this.userRepository.findOne({ where: { id: id }, relations: ['photo'] });
      if (user) return user;
      throw new HttpException("None user found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }


  /** 
   * Method to update an user on database
   * @param id
   * @param data
   * @returns Promise<CreateUserDto & User>
   */

  public async update(id: number, data: UpdateUserDto): Promise<CreateUserDto & User> {
    if (id && Number(id)) {
      const user: CreateUserDto = await this.userRepository.findOne({ where: { id: id } });
      if (user) return await this.userRepository.save({ id, ...user, ...data });
      throw new HttpException("None user found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }


  /** 
   * Method to remove an user on database
   * @param id
   * @returns Promise<DeleteResult>
   */

  public async remove(id: number): Promise<DeleteResult> {
    if (id && Number(id)) {
      const user: CreateUserDto = await this.userRepository.findOne({ where: { id: id } });
      if (user) return await this.userRepository.delete(id);
      throw new HttpException("None user found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }
}
