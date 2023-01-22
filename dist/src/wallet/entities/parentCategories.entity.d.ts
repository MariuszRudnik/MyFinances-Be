import { WalletEntity } from './wallet.entity';
import { CategoryEntity } from './category.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
export declare class ParentCategoriesEntity {
    id: string;
    name: string;
    plannedBudget: number;
    wallet: WalletEntity;
    category: CategoryEntity[];
    transaction: Transaction[];
}
