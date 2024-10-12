import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
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
}
