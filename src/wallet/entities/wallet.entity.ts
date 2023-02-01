import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { JoinColumn, JoinTable } from 'typeorm/browser';
import { UserEntity } from '../../user/entity/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { ParentCategoriesEntity } from './parentCategories.entity';
import { CategoryEntity } from './category.entity';

@Entity('wallet')
export class WalletEntity extends BaseEntity {
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
  numberWalletUser: number;

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
  initialState: number;

  @Column({
    nullable: true,
    length: 10,
  })
  colorWallet: string;

  @ManyToOne(() => UserEntity, (user) => user.wallet)
  user: UserEntity;

  @OneToMany(() => Transaction, (transaction) => transaction.id)
  transaction: Transaction;

  @OneToMany(
    () => ParentCategoriesEntity,
    (parentCategory) => parentCategory.wallet,
  )
  parentCategory: ParentCategoriesEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.wallet)
  category: CategoryEntity[];
}
