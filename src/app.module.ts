import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionsModule } from './transactions/transactions.module';

import ormconfig from './ormconfig';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(ormconfig), AuthModule, WalletModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
