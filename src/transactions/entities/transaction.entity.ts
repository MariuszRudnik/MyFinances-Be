import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WalletEntity } from '../../wallet/entities/wallet.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { ParentCategoriesEntity } from '../../wallet/entities/parentCategories.entity';
import { CategoryEntity } from '../../wallet/entities/category.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameOfTransactions: string;

  @Column()
  price: string;

  @Column({
    nullable: true,
    //default: () => 'CURRENT_TIMESTAMP'
  })
  dateExpenses: Date;

  @Column()
  operations: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  tags: string;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.transaction)
  wallet: WalletEntity;

  @ManyToOne(
    () => ParentCategoriesEntity,
    (parentCategory) => parentCategory.transaction,
  )
  parentCategory: ParentCategoriesEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.transaction)
  category: CategoryEntity;
}
