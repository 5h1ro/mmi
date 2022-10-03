import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Unit } from './unit/entities/unit.entity';
import { UnitModule } from './unit/unit.module';
import { ValueModule } from './value/value.module';
import { Value } from './value/entities/value.entity';
import { DeviceModule } from './device/device.module';
import { Device } from './device/entities/device.entity';

@Module({
  imports: [
    UnitModule,
    DeviceModule,
    ValueModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'mmi',
      entities: [Unit, Device, Value],
      synchronize: true,
      dropSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
