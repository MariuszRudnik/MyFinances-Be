import { ParentCategoriesEntity } from './parentCategories.entity';
import { WalletEntity } from './wallet.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
export declare class CategoryEntity {
    id: string;
    categoryName: string;
    plannedBudget: number;
    plannedBudgetValur: string;
    parentCategory: ParentCategoriesEntity;
    wallet: WalletEntity;
    transaction: Transaction[];
}
