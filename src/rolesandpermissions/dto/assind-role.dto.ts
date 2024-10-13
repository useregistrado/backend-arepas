import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssingRoleDto {
  @IsNotEmpty()
  @IsNumber()
  id_role: number;

  @IsNotEmpty()
  @IsNumber()
  id_user: number;
}
