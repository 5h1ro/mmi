import { IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  device_id: string;

  @IsNotEmpty()
  parameter: string;

  unit: string;
}
