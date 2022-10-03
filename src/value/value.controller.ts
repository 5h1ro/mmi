import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ValueService } from './value.service';
import { CreateValueDto } from './dto/create-value.dto';
import * as moment from 'moment';
import 'moment-timezone';
import { UnitService } from 'src/unit/unit.service';
import { GetValueDto } from './dto/get-value.dto';
import { Response } from 'express';
import { DeviceService } from 'src/device/device.service';

@Controller('value')
export class ValueController {
  constructor(
    private readonly valueService: ValueService,
    private readonly unitService: UnitService,
    private readonly deviceService: DeviceService,
  ) {}

  @Post()
  create(@Body() createValueDto: CreateValueDto) {
    try {
      this.valueService.create(createValueDto);
      return {
        success: true,
        message: 'data berhasil dimasukkan',
      };
    } catch (error) {
      return {
        success: false,
        message: 'data gagal dimasukkan',
        error,
      };
    }
  }

  @Get(':unit?/:device?')
  async findAll(
    @Param('unit') unit: number,
    @Param('device') device: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let response: any, status: number, data: any[];
    const resUnit = await this.unitService.findOne(unit ? unit : 0);
    const resDevice = await this.deviceService.findOne(device ? device : '');
    if (resUnit || resDevice) {
      data = await this.valueService.findAll(
        resUnit ? resUnit : null,
        resDevice ? resDevice : null,
      );
    } else {
      data = await this.valueService.findAll();
    }
    if (data.length) {
      response = {
        success: true,
        message: 'data berhasil di dapatkan',
        data: data.map((val) => ({
          id: val.value_id,
          value: val.v_value,
          device:
            'unit ' +
            val.u_unit_id.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }),
          parameter: val.d_parameter,
          unit: val.d_unit,
        })),
      };

      status = HttpStatus.OK;
    } else {
      response = {
        success: false,
        message: 'data tidak ditemukan',
      };
      status = HttpStatus.NOT_FOUND;
    }

    res.status(status);
    return response;
  }

  @Post('date')
  async detail(
    @Body() req: GetValueDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    let start: Date, end: Date, response: any, status: number;
    const resUnit = await this.unitService.findOne(+req.unit);
    const resDevice = await this.deviceService.findOne(req.device);

    if (!resUnit || !resDevice) {
      res.status(HttpStatus.NOT_FOUND);
      return {
        success: false,
        message: (!resUnit ? 'unit' : 'device') + ' tidak ditemukan',
      };
    }
    if (req.start || req.end) {
      start = new Date(req.start);
      end = new Date(
        moment(!req.end ? req.start : req.end)
          .add(1, 'days')
          .format('YYYY-MM-DD'),
      );
    } else {
      start = new Date(moment().format('YYYY-MM-DD'));
      end = new Date(moment().add(1, 'days').format('YYYY-MM-DD'));
    }
    const diff = moment.duration(moment(end).diff(moment(start)));
    const diffHours = diff.asHours();
    if (diffHours < 0) {
      res.status(HttpStatus.BAD_REQUEST);
      return {
        success: false,
        message: 'Tanggal akhir harus lebih dari tanggal awal',
      };
    }
    const data = await this.valueService.find(resUnit, resDevice, start, end);
    if (data[0].length) {
      response = {
        success: true,
        message: 'data berhasil di dapatkan',
        data: {
          parameter: data[0][0].device.parameter,
          unit: data[0][0].device.unit,
          unitID: data[0][0].unit.unit_id.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }),
          deviceID: data[0][0].device.device_id,
          max: data[1].max,
          min: data[2].min,
          median: parseFloat(data[3].median).toFixed(1),
          date: moment(data[0][0].created_at).format('DD-MM-YYYY HH:mm:ss'),
          data: data[0].map((val) => ({
            id: val.id,
            value: val.value,
          })),
        },
      };
      status = HttpStatus.OK;
    } else {
      response = {
        success: false,
        message: 'data tidak ditemukan',
      };
      status = HttpStatus.NOT_FOUND;
    }
    res.status(status);
    return response;
  }
}
