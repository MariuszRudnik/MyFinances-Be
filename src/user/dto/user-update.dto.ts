import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateDto {
  @ApiProperty({
    description: 'Name user',
    example: 'Mariusz'
  })
  first_name?: string;
  @ApiProperty({
    description: 'Last name user',
    example: 'Json'
  })
  last_name?: string;
  @ApiProperty({
    description: 'Email user',
    example: 'mariusz@wp.pl'
  })
  email?: string;
}
