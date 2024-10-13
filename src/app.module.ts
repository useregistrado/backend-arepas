import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './config/typeorm.module';
import { UsersModule } from './users/users.module';
import { RolesandpermissionsModule } from './rolesandpermissions/rolesandpermissions.module';
import { EndpointsAutoregisterModule } from './endpoints-autoregister/endpoints-autoregister.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule,
    UsersModule,
    RolesandpermissionsModule,
    EndpointsAutoregisterModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
