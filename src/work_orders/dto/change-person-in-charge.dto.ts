import { IsArray, IsOptional } from 'class-validator';

export class ChangePersonInChargeDto {
  @IsArray()
  @IsOptional()
  users_to_delete: number[];

  @IsArray()
  @IsOptional()
  users_to_add: number[];
}
