import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolesandpermissionDto } from './dto/create-rolesandpermission.dto';
import { UpdateRolesandpermissionDto } from './dto/update-rolesandpermission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { Permissions } from './entities/permissions.entity';
import { AssingPermissionsDto } from './dto/assing-permissions.dto';
import { RolePermissions } from './entities/rolepermissions.entity';
import { User } from 'src/users/entities/user.entity';
import { AssingRoleDto } from './dto/assind-role.dto';

@Injectable()
export class RolesandpermissionsService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    @InjectRepository(Permissions)
    private permissionsRepository: Repository<Permissions>,
    @InjectRepository(RolePermissions)
    private rolesPermissionsRepository: Repository<RolePermissions>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createRolesandpermissionDto: CreateRolesandpermissionDto) {
    return 'This action adds a new rolesandpermission';
  }

  async findAllRoles() {
    const roles = await this.rolesRepository.find();
    return roles;
  }

  async findAllPermissions() {
    const permissions = await this.permissionsRepository.find();
    return permissions;
  }

  async findPermissionsOfRole(id: number) {
    const roles = await this.rolesRepository.findOne({
      where: { id },
      relations: ['rol_permissions', 'rol_permissions.id_permission'],
    });
    if (!roles) {
      throw new NotFoundException(`No existe el rol con id ${id}`);
    }
    return roles;
  }

  async assingPermissions(assingPermissionsDto: AssingPermissionsDto) {
    const { id_permissions, id_role } = assingPermissionsDto;
    const role = await this.findOneRole(id_role);
    id_permissions.forEach(async (id_permission: number) => {
      const permission = await this.findOnePermission(id_permission);
      this.rolesPermissionsRepository.save({
        id_rol: role,
        id_permission: permission,
      });
    });

    return 'ok';
  }

  async assingRole(assingRoleDto: AssingRoleDto) {
    const { id_user, id_role } = assingRoleDto;
    const role = await this.findOneRole(id_role);
    const user = await this.findOneUser(id_user);
    user.id_rol = role;
    this.userRepository.save(user);

    return 'ok';
  }

  async findOneRole(id: number): Promise<Roles> {
    return this.rolesRepository.findOneBy({ id });
  }

  async findOnePermission(id: number): Promise<Permissions> {
    return this.permissionsRepository.findOneBy({ id });
  }

  async findOneUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
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
