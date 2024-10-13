import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class AssingPermissionsDto {
  @IsNotEmpty()
  @IsNumber()
  id_role: number;

  @IsNotEmpty()
  @IsArray()
  id_permissions: number[];
}
