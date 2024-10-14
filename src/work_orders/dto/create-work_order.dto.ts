import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateWorkOrderDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'El campo name debe ser de minimo 5 caracteres' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, {
    message: 'El campo description debe ser de minimo 10 caracteres',
  })
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  execution_date: Date;

  @IsNotEmpty()
  @IsNumber()
  estimated_execution_time: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsNumber()
  id_area: number;

  @IsNotEmpty()
  @IsArray()
  id_users_in_charge: number[];
}
