import { WalletEntity } from '../../wallet/entities/wallet.entity';
export declare class Transaction {
    id: string;
    nameOfTransactions: string;
    category: string;
    parentCategories: string;
    price: number;
    dateExpenses: Date;
    operations: string;
    wallet: WalletEntity;
}
