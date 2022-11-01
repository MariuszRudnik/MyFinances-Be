import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WalletEntity } from '../../wallet/entities/wallet.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameOfTransactions: string;

  @Column({
    nullable: true,
  })
  category: string;

  @Column()
  price: number;

  @Column({
    nullable: true,
    //default: () => 'CURRENT_TIMESTAMP'
  })
  dateExpenses: Date;

  @Column()
  operations: string;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.transaction)
  wallet: WalletEntity;
}
