import { WalletEntity } from '../../wallet/entities/wallet.entity';
import { ParentCategoriesEntity } from '../../wallet/entities/parentCategories.entity';
import { CategoryEntity } from '../../wallet/entities/category.entity';
export declare class Transaction {
    id: string;
    nameOfTransactions: string;
    price: string;
    dateExpenses: Date;
    operations: string;
    description: string;
    tags: string;
    wallet: WalletEntity;
    parentCategory: ParentCategoriesEntity;
    category: CategoryEntity;
}
