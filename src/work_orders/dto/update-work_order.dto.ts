import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkOrderDto } from './create-work_order.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateWorkOrderDto extends PartialType(CreateWorkOrderDto) {
  @IsNumber()
  @IsOptional()
  real_execution_time: number;
}
