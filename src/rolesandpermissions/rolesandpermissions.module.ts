import { Module } from '@nestjs/common';
import { RolesandpermissionsService } from './rolesandpermissions.service';
import { RolesandpermissionsController } from './rolesandpermissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { Permissions } from './entities/permissions.entity';
import { RolePermissions } from './entities/rolepermissions.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles, Permissions, RolePermissions, User]),
  ],
  controllers: [RolesandpermissionsController],
  providers: [RolesandpermissionsService],
})
export class RolesandpermissionsModule {}
