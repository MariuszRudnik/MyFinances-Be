import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { addWalletType } from '../../types/wallet/wallet';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    private jwtService: JwtService,
  ) {}

  async create(createWalletDto: CreateWalletDto, request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    const { nameOfWallet, typeOfCurrency, initialState } = createWalletDto;
    const initialStateNumber = Number(initialState);

    const log = await this.walletRepository.find({
      select: {
        id: data.id,
      },
    });

    const wallet: addWalletType | { user: any } = {
      user: data.id,
      numberWalletUser: log.length + 1,
      nameOfWallet,
      typeOfCurrency,
      initialState: initialStateNumber,
    };
    console.log(wallet);
    await this.walletRepository.save(wallet);
    return wallet;
  }

  async findAll() {
    const all = await this.walletRepository.find();
    return all;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
