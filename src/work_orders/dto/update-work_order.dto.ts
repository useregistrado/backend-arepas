import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkOrderDto } from './create-work_order.dto';

export class UpdateWorkOrderDto extends PartialType(CreateWorkOrderDto) {}
