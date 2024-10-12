import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated('uuid')
  uid: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  surname: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  position: string;

  @Column({ type: 'enum', enum: ['masculino', 'femenino', 'otro'] })
  gender: string;

  @Column({ type: 'varchar', length: 15 })
  number_phone: string;

  @Column({ type: 'varchar', length: 15 })
  @JoinColumn({ name: 'number_phone_second' })
  number_phone_second: string;

  @Column({ type: 'enum', enum: ['activo', 'inactivo', 'licencia'] })
  state: string;

  @Column()
  @JoinColumn({ name: 'enabled_to_use_erp' })
  enabled_to_use_erp: boolean;

  @Column({ type: 'varchar', length: 15 })
  password: string;

  @Column()
  @JoinColumn({ name: 'deleted_from_erp' })
  deleted_from_erp: boolean;
}
