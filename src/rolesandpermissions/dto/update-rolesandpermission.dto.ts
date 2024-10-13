import { PartialType } from '@nestjs/mapped-types';
import { CreateRolesandpermissionDto } from './create-rolesandpermission.dto';

export class UpdateRolesandpermissionDto extends PartialType(CreateRolesandpermissionDto) {}
