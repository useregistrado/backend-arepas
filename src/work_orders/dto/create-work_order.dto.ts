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
  @MinLength(5, { message: 'El nombre debe ser de minimo 5 caracteres' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'La descripcion debe ser de minimo 10 caracteres' })
  description: string;

  @IsNotEmpty()
  @IsDate()
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
  @IsNumber()
  id_user: number;

  @IsNotEmpty()
  @IsArray()
  id_users_in_charge: number[];
}
