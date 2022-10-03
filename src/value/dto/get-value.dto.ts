import { IsNotEmpty } from 'class-validator';

export class GetValueDto {
  @IsNotEmpty()
  unit: string;

  @IsNotEmpty()
  device: string;

  start: Date;

  end: Date;
}
