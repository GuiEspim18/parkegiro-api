import { HttpException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>
  ) { }


  /** 
   * Method to create a company on database
   * @param data 
   * @returns Promise<CreateCompanyDto>
   */

  public async create(data: CreateCompanyDto): Promise<CreateCompanyDto> {
    if (data) {
      console.log(data)
      const company: CreateCompanyDto = this.companyRepository.create(data);
      return await this.companyRepository.save(company);
    }
    throw new HttpException("You need to provide a company", 500);
  }


  /** 
   * Method to find all companies on database
   * @returns Promise<Array<CreateCompanyDto>>
   */

  public async findAll(): Promise<Array<CreateCompanyDto>> {
    return await this.companyRepository.find();
  }


  /** 
   * Method to find one company on database
   * @param id
   * @returns Promise<Array<CreateCompanyDto>>
   */

  public async findOne(id: number): Promise<CreateCompanyDto> {
    if (id && Number(id)) {
      const company: CreateCompanyDto = await this.companyRepository.findOne({ where: { id: id } });
      if (company) return company;
      throw new HttpException("None company found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }


  /** 
   * Method to update a company on database
   * @param id
   * @param data
   * @returns Promise<CreateCompanyDto & Company>
   */

  public async update(id: number, data: UpdateCompanyDto): Promise<CreateCompanyDto & Company> {
    if (id && Number(id)) {
      const company: CreateCompanyDto = await this.companyRepository.findOne({ where: { id: id } });
      if (company) return await this.companyRepository.save({ id, ...company, ...data });
      throw new HttpException("None company found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }


  /** 
   * Method to remove a company on database
   * @param id
   * @returns Promise<DeleteResult>
   */

  public async remove(id: number): Promise<DeleteResult> {
    if (id && Number(id)) {
      const company: CreateCompanyDto = await this.companyRepository.findOne({ where: { id: id } });
      if (company) return await this.companyRepository.delete(id);
      throw new HttpException("None plate found", 500);
    }
    throw new HttpException("You need to provide a valid id", 500);
  }
}
