import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([Device]), ScheduleModule.forRoot()],
  exports: [TypeOrmModule],
  controllers: [DeviceController],
  providers: [DeviceService, CronService],
})
export class DeviceModule {}
