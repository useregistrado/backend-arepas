import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './roles.entity';
import { Permissions } from './permissions.entity';

@Entity('role_permissions')
export class RolePermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Roles, (role) => role.rol_permissions)
  @JoinColumn({ name: 'id_rol' })
  id_rol: Roles;

  @ManyToOne(() => Permissions, (permission) => permission.rol_permissions)
  @JoinColumn({ name: 'id_permission' })
  id_permission: Permissions;

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
