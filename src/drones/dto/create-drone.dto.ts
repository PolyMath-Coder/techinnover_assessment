import {
  IsNotEmpty,
  IsNumber,
  Max,
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

import { stateEnum } from '../../shared/enums';

export class CreateDroneDto {
  @IsNumber()
  @IsNotEmpty()
  serialNumber: number;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @Max(500)
  weightLimit: number;

  @IsNumber()
  batteryCapacity: number;

  @IsString()
  @IsEnum(stateEnum)
  state: stateEnum;
}
