import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}
  create(createDeviceDto: CreateDeviceDto) {
    return this.deviceRepository.insert(createDeviceDto);
  }

  findAll() {
    return this.deviceRepository.find();
  }

  findOne(device_id: string) {
    return this.deviceRepository.findOne({
      where: { device_id },
    });
  }
}
