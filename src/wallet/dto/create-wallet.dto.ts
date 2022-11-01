import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty({
    description: "Name of the user's wallet",
    example: 'Wallet',
  })
  nameOfWallet: string;

  @ApiProperty({
    description: "Type of currency of user's wallet",
    example: 'PLN',
  })
  typeOfCurrency: string;

  @ApiProperty({
    description: "Initial states of user's wallet",
    example: '0',
  })
  initialState: string;
}
