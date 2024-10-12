import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolePermissions } from './rolepermissions.entity';

@Entity('permissions')
export class Permissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @JoinColumn({ name: 'controller_path' })
  controller_path: string;

  @Column()
  @JoinColumn({ name: 'full_path' })
  full_path: string;

  @Column()
  method: string;

  @OneToMany(
    () => RolePermissions,
    (rolePermissions) => rolePermissions.id_permission,
  )
  rol_permissions: RolePermissions[];

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
