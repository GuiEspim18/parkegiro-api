import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.options';
import { Photo } from './entities/photo.entity';
import { DeleteResult } from 'typeorm';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}


  /** 
   * Method to create a photo on database
   * @param data 
   * @returns Promise<CreatePhotoDto>
   */

  @Post(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  public async create(@UploadedFile() file: any, @Param('id') id: string): Promise<CreatePhotoDto> {
    let data: CreatePhotoDto =  new CreatePhotoDto(file.path, file.filename, file.originalname, Number(id));
    return this.photoService.create(data);
  }


  /** 
   * Method to find all photo on database
   * @returns Promise<Array<CreatePhotoDto>>
   */

  @Get()
  public findAll(): Promise<Array<CreatePhotoDto>> {
    return this.photoService.findAll();
  }


  /** 
   * Method to find one photo on database
   * @param id
   * @returns Promise<Array<CreatePhotoDto>>
   */

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<CreatePhotoDto> {
    return this.photoService.findOne(+id);
  }


  /** 
   * Method to update a photo on database
   * @param id
   * @param data
   * @returns Promise<CreatePhotoDto & Photo>
   */

  @Patch(':id')
  public update(@Param('id') id: string, @Body() data: UpdatePhotoDto): Promise<CreatePhotoDto & Photo> {
    return this.photoService.update(+id, data);
  }


  /** 
   * Method to remove a photo on database
   * @param id
   * @returns Promise<DeleteResult>
   */

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.photoService.remove(+id);
  }
}
