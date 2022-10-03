import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { UnitService } from './unit.service';

@Injectable()
export class CronService {
  constructor(private readonly unitService: UnitService) {}

  @Timeout(1000)
  handleTimeout() {
    for (let i = 0; i < 5; i++) {
      this.unitService.create({
        unit_id: i + 1,
      });
    }
  }
}
