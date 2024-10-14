import { Area } from 'src/areas/entities/area.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PersonInCharge } from './person_in_charge.entity';

@Entity()
export class WorkOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ name: 'deleted_from_erp', default: false })
  deleted_from_erp: boolean;

  @Column({ name: 'execution_date' })
  execution_date: Date;

  @Column({ name: 'estimated_execution_time' })
  estimated_execution_time: number;

  @Column({ name: 'real_execution_time', nullable: true })
  real_execution_time: number;

  @Column()
  type: string;

  @Column()
  state: string;

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

  @ManyToOne(() => User, (user) => user.work_orders)
  @JoinColumn({ name: 'id_user' })
  id_user: User;

  @ManyToOne(() => Area, (area) => area.work_orders)
  @JoinColumn({ name: 'id_area' })
  id_area: User;

  @OneToMany(
    () => PersonInCharge,
    (personInCharge) => personInCharge.id_work_order,
  )
  person_in_charge: PersonInCharge[];
}
