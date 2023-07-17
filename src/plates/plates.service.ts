import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlateDto } from './dto/create-plate.dto';
import { UpdatePlateDto } from './dto/update-plate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plate } from './entities/plate.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PlatesService {

  constructor(
    @InjectRepository(Plate) private readonly plateRepository: Repository<Plate>
  ) { }


  /** 
   * Method to create a plate on database
   * @param data 
   * @returns Promise<CreatePlateDto>
   */

  public async create(data: CreatePlateDto): Promise<CreatePlateDto> {
    if (data) {
      const plate: CreatePlateDto = this.plateRepository.create(data);
      return await this.plateRepository.save(plate);
    }
    throw new HttpException("You need to provide a plate", 500);
  }


  /** 
   * Method to find all plate on database
   * @returns Promise<Array<CreatePlateDto>>
   */

  public async findAll(): Promise<Array<CreatePlateDto>> {
    return await this.plateRepository.find();
  }


  /** 
   * Method to find one plate on database
   * @param id
   * @returns Promise<Array<CreatePlateDto>>
   */

  public async findOne(id: number): Promise<CreatePlateDto> {
    if (id && Number(id)) {
      const plate: CreatePlateDto = await this.plateRepository.findOne({ where: { id: id } });
      if (plate) return plate;
      throw new HttpException("None plate found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }


  /** 
   * Method to find all plate by stage on database
   * @param num
   * @returns Promise<Array<CreatePlateDto>>
   */

  public async findByStage(num: number): Promise<Array<CreatePlateDto>> {
    if (Number(num) === 0 || Number(num) === 1) {
      const plate: Array<CreatePlateDto> = await this.plateRepository.find({ where: { stage: num } });
      if (plate) return plate;
      throw new HttpException("None plate found", 500);
    }
    throw new HttpException("You need to provide a valid stage 0 or 1", 500);
  }


  /** 
   * Method to update a plate on database
   * @param id
   * @param data
   * @returns Promise<CreatePlateDto & Plate>
   */

  public async update(id: number, data: UpdatePlateDto): Promise<CreatePlateDto & Plate> {
    if (id && Number(id)) {
      const plate: CreatePlateDto = await this.plateRepository.findOne({ where: { id: id } });
      if (plate) return await this.plateRepository.save({ id, ...plate, ...data });
      throw new HttpException("None plate found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }


  /** 
   * Method to remove a plate on database
   * @param id
   * @returns Promise<DeleteResult>
   */

  public async remove(id: number): Promise<DeleteResult> {
    if (id && Number(id)) {
      const plate: CreatePlateDto = await this.plateRepository.findOne({ where: { id: id } });
      if (plate) return await this.plateRepository.delete(id);
      throw new HttpException("None plate found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }
}
