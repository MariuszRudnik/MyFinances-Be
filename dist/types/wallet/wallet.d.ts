import { WalletEntity } from '../../src/wallet/entities/wallet.entity';
export declare type addWalletType = Omit<WalletEntity, 'id' | 'transaction' | 'user'>;
