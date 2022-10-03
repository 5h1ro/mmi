import { Module } from '@nestjs/common';
import { ValueService } from './value.service';
import { ValueController } from './value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Value } from './entities/value.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { Unit } from 'src/unit/entities/unit.entity';
import { UnitService } from 'src/unit/unit.service';
import { DeviceService } from 'src/device/device.service';
import { Device } from 'src/device/entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Value, Unit, Device]),
    ScheduleModule.forRoot(),
  ],
  exports: [TypeOrmModule],
  controllers: [ValueController],
  providers: [ValueService, CronService, UnitService, DeviceService],
})
export class ValueModule {}
