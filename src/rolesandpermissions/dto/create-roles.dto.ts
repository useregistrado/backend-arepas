import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString({})
  @MinLength(5, {
    message: 'El atributo names debe ser de al menos cinco caracteres.',
  })
  name: string;

  @IsNotEmpty()
  @IsString({})
  @MinLength(10, {
    message: 'El atributo names debe ser de al menos diez caracteres.',
  })
  description: string;
}
