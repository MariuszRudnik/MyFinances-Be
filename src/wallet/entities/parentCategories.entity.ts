import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WalletEntity } from './wallet.entity';
import { CategoryEntity } from './category.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class ParentCategoriesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  plannedBudget: number;

  @Column({
    nullable: true,
    length: 50,
  })
  icon: string;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.parentCategory)
  wallet: WalletEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parentCategory)
  category: CategoryEntity[];

  @OneToMany(() => Transaction, (transaction) => transaction.parentCategory)
  transaction: Transaction[];
}
