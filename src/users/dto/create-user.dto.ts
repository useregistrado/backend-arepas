import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

const phoneRegex = /^3\d{9}$/;

enum gendersOptions {
  MASCULINO = 'masculino',
  FEMENINO = 'femenino',
  OTRO = 'otro',
}

enum state {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
  LICENCIA = 'licencia',
}
export class CreateUserDto {
  @IsString()
  @MinLength(2, {
    message: 'El atributo names debe ser de al menos dos caracteres.',
  })
  @IsNotEmpty()
  names: string;

  @IsString()
  @MinLength(2, {
    message: 'El atributo surnames debe ser de al menos dos caracteres.',
  })
  @IsNotEmpty()
  surnames: string;

  @IsString()
  @MinLength(5, {
    message: 'El atributo username debe ser de al menos cinco caracteres.',
  })
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `La contraseña debe contener minimo 8 y maximo 20 caracteres,
      minimo una mayuscula y una minuscula,
      un numero y un caracter especial @$!%*?&`,
  })
  password: string;

  @IsString()
  @MinLength(4, {
    message: 'El atributo position debe ser de al menos cuatro caracteres.',
  })
  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  @IsEnum(gendersOptions)
  gender: string;

  @Matches(phoneRegex, { message: 'Debe ser un numero de telefono valido' })
  @IsNotEmpty()
  number_phone: string;

  @IsOptional()
  @Matches(phoneRegex, { message: 'Debe ser un numero de telefono valido' })
  number_phone_second: string;

  @IsNotEmpty()
  @IsEnum(state)
  state: string;

  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean;
}
