import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/loginDto.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(loginCredentials: LoginDto) {
    const user = await this.userService.findOneByUsername(
      loginCredentials.username,
    );

    if (!user) {
      throw new UnauthorizedException('Usuario o credenciales inválidas');
    }
    const { password, ...data } = user;
    const payload = { sub: user.id };
    const isMatch = await this.comparePasswords(
      loginCredentials.password,
      password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Usuario o credenciales inválidas');
    }
    return {
      user: data,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
