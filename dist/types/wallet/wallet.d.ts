import { WalletEntity } from '../../src/wallet/entities/wallet.entity';
export declare type WalletType = Omit<WalletEntity, 'id' | 'transaction' | 'user'>;
export declare type User = {
    user: any;
};
export declare type addWalletType = WalletType | User;
