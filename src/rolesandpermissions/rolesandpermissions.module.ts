import { Module } from '@nestjs/common';
import { RolesandpermissionsService } from './rolesandpermissions.service';
import { RolesandpermissionsController } from './rolesandpermissions.controller';

@Module({
  controllers: [RolesandpermissionsController],
  providers: [RolesandpermissionsService],
})
export class RolesandpermissionsModule {}
