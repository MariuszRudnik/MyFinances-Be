import { WalletEntity } from "./wallet.entity";
import { CategoryEntity } from "./category.entity";
export declare class ParentCategoriesEntity {
    id: string;
    name: string;
    wallet: WalletEntity;
    category: CategoryEntity[];
}
