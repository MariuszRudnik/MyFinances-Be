import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../utils/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from '../wallet/entities/wallet.entity';
import { ParentCategoriesEntity } from '../wallet/entities/parentCategories.entity';
import { CategoryEntity } from '../wallet/entities/category.entity';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([
      WalletEntity,
      ParentCategoriesEntity,
      CategoryEntity,
      Transaction,
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
