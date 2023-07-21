import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}


  /** 
   * Method to create a photo on database
   * @param data 
   * @returns Promise<CreatePhotoDto>
   */

  @Post()
  public create(@Body() data: CreatePhotoDto) {
    return this.photoService.create(data);
  }


  /** 
   * Method to find all photo on database
   * @returns Promise<Array<CreatePhotoDto>>
   */

  @Get()
  public findAll() {
    return this.photoService.findAll();
  }


  /** 
   * Method to find one photo on database
   * @param id
   * @returns Promise<Array<CreatePhotoDto>>
   */

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.photoService.findOne(+id);
  }


  /** 
   * Method to update a photo on database
   * @param id
   * @param data
   * @returns Promise<CreatePhotoDto & Photo>
   */

  @Patch(':id')
  public update(@Param('id') id: string, @Body() data: UpdatePhotoDto) {
    return this.photoService.update(+id, data);
  }


  /** 
   * Method to remove a photo on database
   * @param id
   * @returns Promise<DeleteResult>
   */

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}
