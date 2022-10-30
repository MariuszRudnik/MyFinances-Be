import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('wallet')
export class WalletEntity {
  @ApiProperty({
    description: 'Primary key as Wallet ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: "Number of the user's  wallet",
    example: '1',
  })
  @Column()
  numberWalletUser: string;

  @ApiProperty({
    description: "Name of the user's wallet",
    example: 'Wallet',
  })
  @Column()
  nameOfWallet: string;

  @ApiProperty({
    description: "Type of currency of user's wallet",
    example: 'PLN',
  })
  @Column()
  typeOfCurrency: string;

  @ApiProperty({
    description: "Initial states of user's wallet",
    example: '0',
  })
  @Column()
  initialState: string;
}
