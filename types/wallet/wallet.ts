import { WalletEntity } from '../../src/wallet/entities/wallet.entity';

export type WalletType = Omit<WalletEntity, 'id' | 'transaction' | 'user'>;
export type User = {
  user: any;
};
export type addWalletType = WalletType | User;
