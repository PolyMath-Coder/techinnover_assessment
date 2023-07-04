import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  name: string;

  @IsNumber()
  weight: number;

  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  image?: string;
}
