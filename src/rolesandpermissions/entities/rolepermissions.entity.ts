import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}
