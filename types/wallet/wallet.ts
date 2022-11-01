import { WalletEntity } from '../../src/wallet/entities/wallet.entity';

export type addWalletType = Omit<WalletEntity, 'id' | 'transaction' | 'user'>;
