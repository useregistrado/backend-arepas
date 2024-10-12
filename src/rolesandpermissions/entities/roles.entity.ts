import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolePermissions } from './rolepermissions.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  descripton: string;

  @OneToMany(() => User, (user) => user.id_rol)
  users: User[];

  @OneToMany(() => RolePermissions, (rolePermissions) => rolePermissions.id_rol)
  rol_permissions: RolePermissions[];
}
