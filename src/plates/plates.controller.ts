import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatesService } from './plates.service';
import { CreatePlateDto } from './dto/create-plate.dto';
import { UpdatePlateDto } from './dto/update-plate.dto';
import { Plate } from './entities/plate.entity';
import { DeleteResult } from 'typeorm';

@Controller('plates')
export class PlatesController {

  constructor(
    private readonly platesService: PlatesService
  ) {}


  /** 
   * Method to create a plate on database
   * @param data 
   * @returns Promise<CreatePlateDto>
   */

  @Post()
  public create(@Body() data: CreatePlateDto): Promise<CreatePlateDto> {
    return this.platesService.create(data);
  }


  /** 
   * Method to find all plate by stage on database
   * @param num 
   * @returns Promise<CreatePlateDto>
   */

  @Get('/stage/:num')
  public findByStage(@Param('num') num: string): Promise<Array<CreatePlateDto>> {
    return this.platesService.findByStage(+num);
  }


  /** 
   * Method to find all plate on database
   * @returns Promise<Array<CreatePlateDto>>
   */

  @Get()
  public findAll(): Promise<Array<CreatePlateDto>> {
    return this.platesService.findAll();
  }


  /** 
   * Method to find one plate on database
   * @param id
   * @returns Promise<Array<CreatePlateDto>>
   */

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<CreatePlateDto> {
    return this.platesService.findOne(+id);
  }


  /** 
   * Method to update a plate on database
   * @param id
   * @param data
   * @returns Promise<CreatePlateDto & Plate>
   */

  @Patch(':id')
  public update(@Param('id') id: string, @Body() data: UpdatePlateDto): Promise<CreatePlateDto & Plate> {
    return this.platesService.update(+id, data);
  }


  /** 
   * Method to remove a plate on database
   * @param id
   * @returns Promise<DeleteResult>
   */

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.platesService.remove(+id);
  }
}
