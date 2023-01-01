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

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoryName: string;

  // @ManyToOne(() => UserEntity, (user) => user.category)
  // user: UserEntity;

  @ManyToOne(
    () => ParentCategoriesEntity,
    (parentCategory) => parentCategory.category,
  )
  parentCategory: ParentCategoriesEntity;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.category)
  wallet: WalletEntity;
}
