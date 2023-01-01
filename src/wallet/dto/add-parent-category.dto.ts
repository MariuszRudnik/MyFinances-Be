import { ApiProperty } from '@nestjs/swagger';

export class AddParentCategoryDto {
  name: string;
  wallet: string;

  // @ApiProperty({
  //   description: "Initial states of user's wallet",
  //   example: '0',
  // })
  // initialState: string;
}
