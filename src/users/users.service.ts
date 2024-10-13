import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserWithPermissions } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolePermissions } from 'src/rolesandpermissions/entities/rolepermissions.entity';

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
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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
    const userPermissions = user.id_rol.rol_permissions;
    console.log(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id_rol, ...data } = user;

    const permissions = userPermissions.map((value: RolePermissions) => {
      return {
        resource: value.id_permission.full_path,
        method: value.id_permission.method,
      };
    });

    return { id_rol: null, ...data, permissions };
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
