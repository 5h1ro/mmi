import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) {}

  create(createUnitDto: CreateUnitDto) {
    return this.unitRepository.insert(createUnitDto);
  }

  findAll(): Promise<Unit[]> {
    return this.unitRepository.find();
  }

  findOne(unit_id: number) {
    return this.unitRepository.findOne({
      where: { unit_id },
    });
  }
}
