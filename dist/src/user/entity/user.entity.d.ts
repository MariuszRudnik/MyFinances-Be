import { BaseEntity } from 'typeorm';
import { WalletEntity } from '../../wallet/entities/wallet.entity';
export declare class UserEntity extends BaseEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    wallet: WalletEntity[];
}
