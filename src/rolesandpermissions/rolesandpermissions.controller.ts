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
import { CreateRolesandpermissionDto } from './dto/create-rolesandpermission.dto';
import { UpdateRolesandpermissionDto } from './dto/update-rolesandpermission.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AssingPermissionsDto } from './dto/assing-permissions.dto';
import { AssingRoleDto } from './dto/assind-role.dto';

@UseGuards(AuthGuard)
@Controller('rolesandpermissions')
export class RolesandpermissionsController {
  constructor(
    private readonly rolesandpermissionsService: RolesandpermissionsService,
  ) {}

  @Post()
  create(@Body() createRolesandpermissionDto: CreateRolesandpermissionDto) {
    return this.rolesandpermissionsService.create(createRolesandpermissionDto);
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
  findPermissionsOfRole(@Param('id') id: string) {
    return this.rolesandpermissionsService.findPermissionsOfRole(+id);
  }

  @Post('/assing-permissions')
  assingPermissions(@Body() assingPermissionsDto: AssingPermissionsDto) {
    return this.rolesandpermissionsService.assingPermissions(
      assingPermissionsDto,
    );
  }

  @Post('/assing-role')
  assingRole(@Body() assingRoleDto: AssingRoleDto) {
    return this.rolesandpermissionsService.assingRole(assingRoleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesandpermissionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRolesandpermissionDto: UpdateRolesandpermissionDto,
  ) {
    return this.rolesandpermissionsService.update(
      +id,
      updateRolesandpermissionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesandpermissionsService.remove(+id);
  }
}
