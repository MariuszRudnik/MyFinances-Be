import { ParentCategoriesEntity } from './parentCategories.entity';
import { WalletEntity } from './wallet.entity';
export declare class CategoryEntity {
    id: string;
    categoryName: string;
    parentCategory: ParentCategoriesEntity;
    wallet: WalletEntity;
}
