import { IsNotEmpty } from 'class-validator';
import { Device } from 'src/device/entities/device.entity';
import { Unit } from 'src/unit/entities/unit.entity';

export class CreateValueDto {
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  unit: Unit;

  @IsNotEmpty()
  device: Device;

  created_at: Date;
}
