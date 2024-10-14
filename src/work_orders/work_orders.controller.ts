import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { WorkOrdersService } from './work_orders.service';
import { CreateWorkOrderDto } from './dto/create-work_order.dto';
import { UpdateWorkOrderDto } from './dto/update-work_order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChangePersonInChargeDto } from './dto/change-person-in-charge.dto';

@UseGuards(AuthGuard)
@Controller('work-orders')
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Post()
  create(
    @Body() createWorkOrderDto: CreateWorkOrderDto,
    @Req() request: Request,
  ) {
    const userRequest: number = request['user'].sub;
    return this.workOrdersService.create(userRequest, createWorkOrderDto);
  }

  @Get()
  findAll() {
    return this.workOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workOrdersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkOrderDto: UpdateWorkOrderDto,
  ) {
    return this.workOrdersService.update(+id, updateWorkOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workOrdersService.remove(+id);
  }

  @Patch('/change-person-in-charge/:id')
  updatePersonInCharge(
    @Param('id') id: string,
    @Body() changePersonInChargeDto: ChangePersonInChargeDto,
  ) {
    const { users_to_add, users_to_delete } = changePersonInChargeDto;
    if (!users_to_add && !users_to_delete) {
      throw new BadRequestException(
        'Debe enviar al menos uno de los dos campos: users_to_add o users_to_delete',
      );
    }

    return this.workOrdersService.changePersonInCharge(
      +id,
      changePersonInChargeDto,
    );
  }
}
