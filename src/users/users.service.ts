import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserWithPermissions } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolePermissions } from 'src/rolesandpermissions/entities/rolepermissions.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { enabled } = createUserDto;
    const passwordHash = await this.encryptPassword(createUserDto.password);

    try {
      const user = await this.userRepository.save({
        ...createUserDto,
        password: passwordHash,
        enabled_to_use_erp: enabled,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...data } = user;
      return data;
    } catch (error) {
      const errorMessage = JSON.parse(
        JSON.stringify(error, Object.getOwnPropertyNames(error)),
      ).detail;
      throw new ConflictException(errorMessage);
    }
  }

  findAll() {
    const users = this.userRepository.find();
    return plainToClass(User, users);
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<UserWithPermissions> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: [
        'id_rol',
        'id_rol.rol_permissions',
        'id_rol.rol_permissions.id_permission',
      ],
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id_rol, ...data } = user;

    let userPermissions = [];
    let id_rol_user = null;

    if (id_rol && typeof user.id_rol != 'number') {
      userPermissions = user.id_rol.rol_permissions;
      id_rol_user = user.id_rol.id;
    }

    const permissions = userPermissions.map((value: RolePermissions) => {
      return {
        resource: value.id_permission.full_path,
        method: value.id_permission.method,
      };
    });

    return { id_rol: id_rol_user, ...data, permissions };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
