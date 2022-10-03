import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { DeviceService } from './device.service';

@Injectable()
export class CronService {
  constructor(private readonly deviceService: DeviceService) {}

  @Timeout(1000)
  handleTimeout() {
    const name = [
      'Debit',
      'TSS',
      'pH',
      'NO3N',
      'PO4',
      'NH3N',
      'TDS',
      'BOD 5',
      'COD',
      'Fe',
      'Cu',
      'Cr',
    ];
    name.forEach((val, index) => {
      this.deviceService.create({
        device_id:
          'SW-' +
          (index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }),
        parameter: val,
        unit: index === 0 ? 'm3/s' : index === 2 ? '' : 'mg/L',
      });
    });
  }
}
