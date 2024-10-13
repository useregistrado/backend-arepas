import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesandpermissionsService } from './rolesandpermissions.service';
import { CreateRolesandpermissionDto } from './dto/create-rolesandpermission.dto';
import { UpdateRolesandpermissionDto } from './dto/update-rolesandpermission.dto';

@Controller('rolesandpermissions')
export class RolesandpermissionsController {
  constructor(private readonly rolesandpermissionsService: RolesandpermissionsService) {}

  @Post()
  create(@Body() createRolesandpermissionDto: CreateRolesandpermissionDto) {
    return this.rolesandpermissionsService.create(createRolesandpermissionDto);
  }

  @Get()
  findAll() {
    return this.rolesandpermissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesandpermissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolesandpermissionDto: UpdateRolesandpermissionDto) {
    return this.rolesandpermissionsService.update(+id, updateRolesandpermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesandpermissionsService.remove(+id);
  }
}
