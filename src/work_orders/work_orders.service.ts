import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkOrderDto } from './dto/create-work_order.dto';
import { UpdateWorkOrderDto } from './dto/update-work_order.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { WorkOrder } from './entities/work_order.entity';
import { DataSource, Repository } from 'typeorm';
import { PersonInCharge } from './entities/person_in_charge.entity';
import { AreasService } from 'src/areas/areas.service';
import { UsersService } from 'src/users/users.service';
import { ChangePersonInChargeDto } from './dto/change-person-in-charge.dto';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
    @InjectRepository(PersonInCharge)
    private personInChargeRepository: Repository<PersonInCharge>,
    private areaService: AreasService,
    private usersService: UsersService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async create(
    id_user_creator: number,
    createWorkOrderDto: CreateWorkOrderDto,
  ) {
    const userCreator = await this.usersService.findOne(id_user_creator);
    const { id_area, id_users_in_charge, ...data } = createWorkOrderDto;
    const area = await this.areaService.findOne(id_area);
    const workOrder = await this.workOrderRepository.save({
      ...data,
      id_area: area,
      id_user: userCreator,
    });

    id_users_in_charge.forEach(async (id_user_in_charge: number) => {
      const user = await this.usersService.findOne(id_user_in_charge);
      this.personInChargeRepository.save({
        id_user: user,
        id_work_order: workOrder,
      });
    });
    return workOrder;
  }

  async findAll() {
    const workOrders = await this.dataSource
      .createQueryBuilder(WorkOrder, 'workOrder')
      .leftJoinAndSelect('workOrder.person_in_charge', 'personInCharge')
      .leftJoinAndSelect('personInCharge.id_user', 'user')
      .select([
        'workOrder',
        'personInCharge',
        'user.id',
        'user.names',
        'user.surnames',
        'user.position',
      ])
      .where('workOrder.deleted_from_erp=false')
      .getMany();
    return workOrders;
  }

  async findOne(id: number) {
    const workOrder = await this.dataSource
      .createQueryBuilder(WorkOrder, 'workOrder')
      .leftJoinAndSelect('workOrder.person_in_charge', 'personInCharge')
      .leftJoinAndSelect('personInCharge.id_user', 'user')
      .select([
        'workOrder',
        'personInCharge',
        'user.id',
        'user.names',
        'user.surnames',
        'user.position',
      ])
      .where('workOrder.id= :workOrderId', { workOrderId: id })
      .getOne();
    if (!workOrder) {
      throw new NotFoundException(
        `No se encontro la orden de trabajo con id ${id}`,
      );
    }
    return workOrder;
  }

  async update(id: number, updateWorkOrderDto: UpdateWorkOrderDto) {
    const workOrder = await this.findOneSimple(id);
    if (!workOrder) {
      throw new NotFoundException(
        `No se pudo actualizar la orden de trabajo con id ${id}`,
      );
    }
    const workOrderUpdated = {
      ...workOrder,
      ...updateWorkOrderDto,
    } as WorkOrder;

    const workOrderUpdatedSaved =
      this.workOrderRepository.save(workOrderUpdated);
    return workOrderUpdatedSaved;
  }

  async remove(id: number) {
    const workOrder = await this.findOneSimple(id);
    if (!workOrder) {
      throw new NotFoundException(
        `No se pudo elimiar la orden de trabajo con id ${id} debido a que no existe`,
      );
    }
    const workOrderDeleted = this.workOrderRepository.save({
      id,
      deleted_from_erp: true,
    });
    return workOrderDeleted;
  }

  async findOneSimple(id: number) {
    const workOrder = await this.workOrderRepository.findOneBy({
      id,
      deleted_from_erp: false,
    });

    return workOrder;
  }

  async changePersonInCharge(
    id: number,
    changePersonInChargeDto: ChangePersonInChargeDto,
  ) {
    const workOrder = await this.findOneSimple(id);
    this.deletePersonInCharge(
      workOrder,
      changePersonInChargeDto.users_to_delete,
    );
    return changePersonInChargeDto;
  }

  async deletePersonInCharge(workOrder: WorkOrder, usersToDelete: number[]) {
    usersToDelete.forEach(async (id: number) => {
      const user = await this.usersService.findOne(id);
      await this.personInChargeRepository.delete({
        id_user: { id: user.id },
        id_work_order: { id: workOrder.id },
      });
    });
  }
}
