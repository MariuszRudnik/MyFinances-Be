import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'User first name',
    example: 'Mariusz',
  })
  firstName: string;

  @ApiProperty({
    description: 'User first last name',
    example: 'Json',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'jhon.doe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User password',
    example: '123',
  })
  @ApiProperty({
    description: 'Repeat the password',
    example: '123',
  })
  @IsNotEmpty()
  passwordConfirm: string;
}
