import { Injectable } from '@nestjs/common';
import { CreateRolesandpermissionDto } from './dto/create-rolesandpermission.dto';
import { UpdateRolesandpermissionDto } from './dto/update-rolesandpermission.dto';

@Injectable()
export class RolesandpermissionsService {
  create(createRolesandpermissionDto: CreateRolesandpermissionDto) {
    return 'This action adds a new rolesandpermission';
  }

  findAll() {
    return `This action returns all rolesandpermissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolesandpermission`;
  }

  update(id: number, updateRolesandpermissionDto: UpdateRolesandpermissionDto) {
    return `This action updates a #${id} rolesandpermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolesandpermission`;
  }
}
