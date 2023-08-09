import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, UseGuards } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.options';
import { Photo } from './entities/photo.entity';
import { DeleteResult } from 'typeorm';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}


  /** 
   * Method to create a photo on database
   * @param data 
   * @returns Promise<CreatePhotoDto>
   */

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  public async create(@UploadedFile() file: any, @Param('id') id: string): Promise<CreatePhotoDto> {
    let data: CreatePhotoDto =  new CreatePhotoDto(file.path, file.filename, file.originalname, Number(id), null);
    return this.photoService.create(data);
  }


  /** 
   * Method to find all photo on database
   * @returns Promise<Array<CreatePhotoDto>>
   */

  @UseGuards(JwtAuthGuard)
  @Get()
  public findAll(): Promise<Array<CreatePhotoDto>> {
    return this.photoService.findAll();
  }


  /** 
   * Method to find one photo on database
   * @param id
   * @returns Promise<Array<CreatePhotoDto>>
   */

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<CreatePhotoDto> {
    return this.photoService.findOne(+id);
  }


  
  /** 
   * Method to download the photo required
   * @param name
   * @param res
   * @returns any
   */

  @Get("download/:name")
  public download(@Param("name") name: string, @Res() res: any): any {
    return res.sendFile(path.resolve(this.photoService.download(name)));
  }


  /** 
   * Method to update a photo on database
   * @param id
   * @param data
   * @returns Promise<CreatePhotoDto & Photo>
   */

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public update(@Param('id') id: string, @Body() data: UpdatePhotoDto): Promise<CreatePhotoDto & Photo> {
    return this.photoService.update(+id, data);
  }


  /** 
   * Method to remove a photo on database
   * @param id
   * @returns Promise<DeleteResult>
   */

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.photoService.remove(+id);
  }
}
