import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @Get()
  async findAll() {
    const res = await this.unitService.findAll();
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
          unit: val.unit_id,
        })),
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.unitService.findOne(+id);
    if (res === null) {
      return {
        success: true,
        message: 'data tidak ditemukan',
      };
    } else {
      return {
        success: true,
        message: 'data berhasil di dapatkan',
        data: {
          unit: res.unit_id,
        },
      };
    }
  }
}
