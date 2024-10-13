import { User } from 'src/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkOrder } from './work_order.entity';

@Entity('person_in_charge')
export class PersonInCharge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.person_in_charge)
  @JoinColumn({ name: 'id_user' })
  id_user: User;

  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.person_in_charge)
  @JoinColumn({ name: 'id_work_order' })
  id_work_order: WorkOrder;

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
}
