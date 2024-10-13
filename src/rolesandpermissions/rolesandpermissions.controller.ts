import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesandpermissionsService } from './rolesandpermissions.service';
import { CreateRoleDto } from './dto/create-roles.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AssingPermissionsDto } from './dto/assing-permissions.dto';
import { AssingRoleDto } from './dto/assind-role.dto';
import { PermissionsToRevokeDto } from './dto/permissions-to-revoke.dto';
import { PermissionGuard } from 'src/auth/permissions.guard';
import { CheckPermissions } from 'src/decorators/permissions.decorator';

@UseGuards(AuthGuard, PermissionGuard)
@Controller('rolesandpermissions')
export class RolesandpermissionsController {
  constructor(
    private readonly rolesandpermissionsService: RolesandpermissionsService,
  ) {}

  @Post('/role')
  @CheckPermissions('POST', 'rolesandpermissions/role')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesandpermissionsService.create(createRoleDto);
  }

  @Get('/roles')
  findAllRoles() {
    return this.rolesandpermissionsService.findAllRoles();
  }

  @Get('/permissions')
  findAllPermissions() {
    return this.rolesandpermissionsService.findAllPermissions();
  }

  @Get('/permissions-of-role/:id')
  @CheckPermissions('GET', 'rolesandpermissions/permissions-of-role/:id')
  findPermissionsOfRole(@Param('id') id: string) {
    return this.rolesandpermissionsService.findPermissionsOfRole(+id);
  }

  @Post('/assing-permissions')
  @CheckPermissions('POST', 'rolesandpermissions/assing-permissions')
  assingPermissions(@Body() assingPermissionsDto: AssingPermissionsDto) {
    return this.rolesandpermissionsService.assingPermissions(
      assingPermissionsDto,
    );
  }

  @CheckPermissions('POST', 'rolesandpermissions/assing-role')
  @Post('/assing-role')
  assingRole(@Body() assingRoleDto: AssingRoleDto) {
    return this.rolesandpermissionsService.assingRole(assingRoleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesandpermissionsService.findOne(+id);
  }

  @Patch('/revoke-role/:id')
  revokeRole(@Param('id') id: string) {
    return this.rolesandpermissionsService.revokeRole(+id);
  }

  @Patch('/revoke-permissions/:id')
  revokePermissions(
    @Param('id') id: string,
    @Body() permissionsToRevokeDto: PermissionsToRevokeDto,
  ) {
    return this.rolesandpermissionsService.revokePermissions(
      +id,
      permissionsToRevokeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesandpermissionsService.remove(+id);
  }
}
