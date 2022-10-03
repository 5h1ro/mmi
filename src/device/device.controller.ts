import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  async findAll() {
    const res = await this.deviceService.findAll();
    if (res === null) {
      return {
        success: true,
        message: 'data tidak ditemukan',
      };
    } else {
      return {
        success: true,
        message: 'data berhasil di dapatkan',
        data: res.map((val) => ({
          id: val.device_id,
          parameter: val.parameter,
          unit: val.unit,
        })),
      };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(id);
  }
}
