import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateValueDto } from './dto/create-value.dto';
import { Value } from './entities/value.entity';
import { Repository } from 'typeorm';
import { Unit } from 'src/unit/entities/unit.entity';
import { Device } from 'src/device/entities/device.entity';

@Injectable()
export class ValueService {
  constructor(
    @InjectRepository(Value)
    private valueRepository: Repository<Value>,
  ) {}

  create(createValueDto: CreateValueDto) {
    return this.valueRepository.insert(createValueDto);
  }

  findAll(unit?: Unit, device?: Device) {
    const inner = this.valueRepository
      .createQueryBuilder('vin')
      .select('MAX(vin.value_id)', 'id')
      .groupBy('vin.fk_unit')
      .addGroupBy('vin.fk_device')
      .getQuery();

    const repository = this.valueRepository
      .createQueryBuilder('v')
      .select([
        'v.value_id',
        'v.value',
        'v.fk_unit',
        'v.fk_device',
        'v.created_at',
        'u.unit_id',
        'd.parameter',
        'd.unit',
      ])
      .innerJoin('(' + inner + ')', 'val', 'v.value_id = val.id')
      .innerJoin('unit', 'u', 'u.unit_id = v.fk_unit')
      .innerJoin('device', 'd', 'd.device_id = v.fk_device')
      .orderBy('v.value_id');

    let res: Promise<any[]>;

    if (unit || device) {
      if (unit && device) {
        res = repository
          .where('u.unit_id = :unit', { unit: unit.unit_id })
          .andWhere('d.device_id = :device', { device: device.device_id })
          .getRawMany();
      } else if (device) {
        res = repository
          .where('d.device_id = :device', { device: device.device_id })
          .getRawMany();
      } else {
        res = repository
          .where('u.unit_id = :unit', { unit: unit.unit_id })
          .getRawMany();
      }
    } else {
      res = repository.getRawMany();
    }
    return res;
  }

  async find(unit: Unit, device: Device, start: Date, end: Date) {
    const repository = this.valueRepository
      .createQueryBuilder('value')
      .leftJoinAndSelect('value.unit', 'unit')
      .leftJoinAndSelect('value.device', 'device')
      .andWhere('unit.unit_id = :unit', { unit: unit.unit_id })
      .andWhere('device.device_id = :device', { device: device.device_id })
      .andWhere('value.created_at between :start and :end ', { start, end });

    const data = await repository.orderBy('value.created_at', 'DESC').getMany();
    const max = await repository.select('MAX(value.value)', 'max').getRawOne();
    const min = await repository.select('MIN(value.value)', 'min').getRawOne();
    const avg = await repository
      .select('AVG(value.value)', 'median')
      .getRawOne();

    return [data, max, min, avg];
  }
}
