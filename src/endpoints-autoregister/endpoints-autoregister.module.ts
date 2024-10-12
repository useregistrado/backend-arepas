import { Module } from '@nestjs/common';
import { EndpointsAutoregisterService } from './endpoints-autoregister.service';
import { DiscoveryModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from 'src/rolesandpermissions/entities/permissions.entity';

@Module({
  imports: [DiscoveryModule, TypeOrmModule.forFeature([Permissions])],
  providers: [EndpointsAutoregisterService],
})
export class EndpointsAutoregisterModule {}
