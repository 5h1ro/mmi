import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([Unit]), ScheduleModule.forRoot()],
  exports: [TypeOrmModule],
  controllers: [UnitController],
  providers: [UnitService, CronService],
})
export class UnitModule {}
