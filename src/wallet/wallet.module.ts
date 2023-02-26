import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { WalletEntity } from './entities/wallet.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../utils/config';
import { ParentCategoriesEntity } from './entities/parentCategories.entity';
import { CategoryEntity } from './entities/category.entity';

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
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
