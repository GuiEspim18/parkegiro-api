import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as fs from "fs";
import { join } from 'path';

@Injectable()
export class PhotoService {

  constructor (
    @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>
  ) { }


  /** 
   * Method to create a photo on database
   * @param data 
   * @returns Promise<CreatePhotoDto>
   */

  public async create(data: CreatePhotoDto): Promise<CreatePhotoDto> {
    if (data) {
      const photo: CreatePhotoDto = this.photoRepository.create(data);
      return await this.photoRepository.save(photo);
    }
    throw new HttpException("You need to provide a photo", 500);
  }


  /** 
   * Method to find all photo on database
   * @returns Promise<Array<CreatePhotoDto>>
   */

  public async findAll(): Promise<Array<CreatePhotoDto>> {
    return await this.photoRepository.find();
  }


  /** 
   * Method to find one photo on database
   * @param id
   * @returns Promise<Array<CreatePhotoDto>>
   */

  public async findOne(id: number): Promise<CreatePhotoDto> {
    if (id && Number(id)) {
      const photo: CreatePhotoDto = await this.photoRepository.findOne({ where: { id: id } });
      if (photo) return photo;
      throw new HttpException("None photo found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }


  /** 
   * Method to update a photo on database
   * @param id
   * @param data
   * @returns Promise<CreatePhotoDto & Photo>
   */

  public async update(id: number, data: UpdatePhotoDto): Promise<CreatePhotoDto & Photo> {
    if (id && Number(id)) {
      const photo: CreatePhotoDto = await this.photoRepository.findOne({ where: { id: id } });
      if (photo) return await this.photoRepository.save({ id, ...photo, ...data });
      throw new HttpException("None photo found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }


  /** 
   * Method to remove a photo on database
   * @param id
   * @returns Promise<DeleteResult>
   */

  public async remove(id: number): Promise<DeleteResult> {
    if (id && Number(id)) {
      const photo: CreatePhotoDto = await this.photoRepository.findOne({ where: { id: id } });
      fs.unlinkSync(photo.url);
      if (photo) return await this.photoRepository.delete(id);
      throw new HttpException("None photo found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }


  
  /** 
   * Method to download the photo required
   * @param name
   * @param res
   * @returns any
   */

  public download(name: string): string {
    const findPath: string = join(__dirname, '../../uploads/' + name.replace(/['"]+/g, ''));
    try {
      const exists = fs.existsSync(findPath);
      if (exists) return `./uploads/${name}`
      throw new HttpException("Arquivo não encontrado", HttpStatus.NOT_FOUND);
    } catch (err: any) {
      throw new HttpException("Erro ao buscar arquivo", HttpStatus.BAD_REQUEST);
    }
  }
}
