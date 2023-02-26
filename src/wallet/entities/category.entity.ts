import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { ParentCategoriesEntity } from './parentCategories.entity';
import { WalletEntity } from './wallet.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoryName: string;

  @Column({
    nullable: true,
  })
  plannedBudget: number;

  @Column({
    nullable: true,
  })
  plannedBudgetValur: string;

  @ManyToOne(
    () => ParentCategoriesEntity,
    (parentCategory) => parentCategory.category,
  )
  parentCategory: ParentCategoriesEntity;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.category)
  wallet: WalletEntity;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transaction: Transaction[];
}
