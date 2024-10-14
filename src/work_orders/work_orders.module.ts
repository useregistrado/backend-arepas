import { Module } from '@nestjs/common';
import { WorkOrdersService } from './work_orders.service';
import { WorkOrdersController } from './work_orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkOrder } from './entities/work_order.entity';
import { PersonInCharge } from './entities/person_in_charge.entity';
import { AreasModule } from 'src/areas/areas.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AreasModule,
    UsersModule,
    TypeOrmModule.forFeature([WorkOrder, PersonInCharge]),
  ],
  controllers: [WorkOrdersController],
  providers: [WorkOrdersService],
})
export class WorkOrdersModule {}
