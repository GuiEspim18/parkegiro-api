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
  public create(@Body() createPlateDto: CreatePlateDto): Promise<CreatePlateDto> {
    return this.platesService.create(createPlateDto);
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
  public update(@Param('id') id: string, @Body() updatePlateDto: UpdatePlateDto): Promise<CreatePlateDto & Plate> {
    return this.platesService.update(+id, updatePlateDto);
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
