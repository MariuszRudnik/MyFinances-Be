import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({
    description: 'Name user',
    example: 'Mariusz',
  })
  firstName?: string;
  @ApiProperty({
    description: 'Last name user',
    example: 'Json',
  })
  lastName?: string;
  @ApiProperty({
    description: 'Email user',
    example: 'mariusz@wp.pl',
  })
  email?: string;
}
