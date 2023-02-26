import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { WalletEntity } from '../../wallet/entities/wallet.entity';
import { CategoryEntity } from '../../wallet/entities/category.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @ApiProperty({
    description: 'Primary key as User ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Mariusz',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    description: 'User first last name',
    example: 'Json',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'jhon.doe@gmail.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Hashed user password',
  })
  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => WalletEntity, (wallet) => wallet.id)
  wallet: WalletEntity[];

  // @OneToMany(() => CategoryEntity, (category) => category.id)
  // category: CategoryEntity[];
}
