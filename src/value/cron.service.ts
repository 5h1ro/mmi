import { Injectable } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import * as moment from 'moment';
import { DeviceService } from 'src/device/device.service';
import { UnitService } from 'src/unit/unit.service';
import { ValueService } from './value.service';

@Injectable()
export class CronService {
  constructor(
    private readonly valueService: ValueService,
    private readonly unitService: UnitService,
    private readonly deviceService: DeviceService,
  ) {}

  @Cron('*/10 * * * * *')
  async handleCron() {
    const unit = await this.unitService.findAll();
    unit.forEach(async (unitVal) => {
      const device = await this.deviceService.findAll();
      device.forEach((deviceVal) => {
        this.valueService.create({
          value: Math.floor(Math.random() * 200),
          unit: unitVal,
          device: deviceVal,
          created_at: new Date(moment().format('YYYY-MM-DD HH:mm:ss')),
        });
      });
    });
  }

  @Timeout(2000)
  async handleTimeout() {
    const unit = await this.unitService.findAll();
    unit.forEach(async (unitVal) => {
      const device = await this.deviceService.findAll();
      device.forEach((deviceVal) => {
        this.valueService.create({
          value: Math.floor(Math.random() * 200),
          unit: unitVal,
          device: deviceVal,
          created_at: undefined,
        });
      });
    });
  }
}
