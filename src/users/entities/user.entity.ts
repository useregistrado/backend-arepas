import { Roles } from 'src/rolesandpermissions/entities/roles.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkOrder } from 'src/work_orders/entities/work_order.entity';
import { PersonInCharge } from 'src/work_orders/entities/person_in_charge.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated('uuid')
  uid: string;

  @Column({ type: 'varchar', length: 30 })
  names: string;

  @Column({ type: 'varchar', length: 30 })
  surnames: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  position: string;

  @Column({ type: 'enum', enum: ['masculino', 'femenino', 'otro'] })
  gender: string;

  @Column({ type: 'varchar', length: 15 })
  number_phone: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  @JoinColumn({ name: 'number_phone_second' })
  number_phone_second: string;

  @Column({ type: 'enum', enum: ['activo', 'inactivo', 'licencia'] })
  state: string;

  @Column()
  @JoinColumn({ name: 'enabled_to_use_erp' })
  enabled_to_use_erp: boolean;

  @Column({ type: 'varchar', length: 65 })
  @Exclude()
  password: string;

  @Column({ default: false })
  @JoinColumn({ name: 'deleted_from_erp' })
  deleted_from_erp: boolean;

  @ManyToOne(() => Roles, (role) => role.users)
  @JoinColumn({ name: 'id_rol' })
  id_rol: Roles | number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToMany(() => WorkOrder, (workOrder) => workOrder.id_user)
  work_orders: WorkOrder[];

  @OneToMany(() => PersonInCharge, (personInCharge) => personInCharge.id_user)
  person_in_charge: PersonInCharge[];
}

export class UserWithPermissions extends User {
  permissions: PermissionUser[];
}

export class PermissionUser {
  resource: string;
  method: string;
}
