import { BadRequestException, Injectable } from "@nestjs/common";
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
    const userID = data.id;
    let numberWalletUser = 0;

    const listOfWallet = await this.walletRepository.find({
      relations: ['user'],
      where: {
        user: {
          id: userID,
        },
      },
    });
    for (let i = 1; i < listOfWallet.length + 1; i++) {
      const checkOfNumberIfItExists = listOfWallet.find(
        (cur) => cur.numberWalletUser === i,
      );
      if (!checkOfNumberIfItExists) {
        numberWalletUser = i;
        break;
      }
    }
    const wallet: addWalletType = {
      user: data.id,
      numberWalletUser: numberWalletUser,
      nameOfWallet,
      typeOfCurrency,
      initialState: initialStateNumber,
    };
    await this.walletRepository.save(wallet);
    return wallet;
  }

  async findWallet(numberOfWallet, request) {
    const number = Number(numberOfWallet);
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    const userID = data.id;

    const listOfWallet = await this.walletRepository.find({
      where: {
        user: {
          id: userID,
        },
      },
    });
    const wallet = await listOfWallet.find(
      (cut) => cut.numberWalletUser === number,
    );
    return wallet;
  }

  async findAllWallet(request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    const userID = data.id;
    let wallets = [];

    const listOfWallet = await this.walletRepository.find({
      where: {
        user: {
          id: userID,
        },
      },
    });

    for (const element of listOfWallet) {
      const { numberWalletUser, nameOfWallet, typeOfCurrency } = element;
      wallets.push({
        numberWalletUser,
        nameOfWallet,
        typeOfCurrency,
      });
    }
    return wallets;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }

  async addCategory(numberOfWallet, request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    const userID = data.id;
    const listOfWallet = await this.walletRepository.find({
      where: {
        user: {
          id: userID,
        },
      },
    });
    const wallet = listOfWallet.filter(
      (item)=> item.numberWalletUser == numberOfWallet)

    if (wallet.length > 1 || wallet.length == 0 ){
      throw new BadRequestException('Something bad happened')
    }
    console.log(wallet.length)

    return wallet
  }
}
