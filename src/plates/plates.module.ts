import { Module } from '@nestjs/common';
import { PlatesService } from './plates.service';
import { PlatesController } from './plates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plate } from './entities/plate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plate])],
  controllers: [PlatesController],
  providers: [PlatesService]
})
export class PlatesModule {}
