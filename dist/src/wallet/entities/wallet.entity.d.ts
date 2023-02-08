import { BaseEntity } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { ParentCategoriesEntity } from './parentCategories.entity';
import { CategoryEntity } from './category.entity';
export declare class WalletEntity extends BaseEntity {
    id: string;
    numberWalletUser: number;
    nameOfWallet: string;
    typeOfCurrency: string;
    initialState: number;
    colorWallet: string;
    user: UserEntity;
    transaction: Transaction;
    parentCategory: ParentCategoriesEntity[];
    category: CategoryEntity[];
}
