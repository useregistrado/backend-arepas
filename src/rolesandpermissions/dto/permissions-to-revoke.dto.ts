import { IsArray, IsNotEmpty } from 'class-validator';

export class PermissionsToRevokeDto {
  @IsNotEmpty()
  @IsArray()
  id_permissions: number[];
}
