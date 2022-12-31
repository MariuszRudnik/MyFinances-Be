import { BaseEntity } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { ParentCategoriesEntity } from "./parentCategories.entity";
export declare class WalletEntity extends BaseEntity {
    id: string;
    numberWalletUser: number;
    nameOfWallet: string;
    typeOfCurrency: string;
    initialState: number;
    user: UserEntity;
    transaction: Transaction;
    parentCategory: ParentCategoriesEntity[];
}
