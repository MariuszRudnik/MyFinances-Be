import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { addWalletType } from '../../types/wallet/wallet';
import { CategoryEntity } from './entities/category.entity';
import { ParentCategoriesEntity } from './entities/parentCategories.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<any>,
    @InjectRepository(ParentCategoriesEntity)
    private readonly parenCategoryRepository: Repository<any>,
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

  async addParentCategory(numberOfCategory, request, body) {
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
      (item) => item.numberWalletUser == numberOfCategory,
    );

    if (wallet.length > 1 || wallet.length == 0) {
      throw new BadRequestException('Something bad happened');
    }
    const parent = await this.parenCategoryRepository.save({
      name: body.name,
      plannedBudget: body.plannedBudget,
      wallet: wallet[0].id,
    });

    const category = {
      categoryName: 'Other',
      parentCategory: parent.id,
      wallet: wallet[0].id,
    };
    await this.categoryRepository.save(category);
    return { ok: 'ok' };
  }

  async getParentCategory(request, numberOfCategory) {
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
      (item) => item.numberWalletUser == numberOfCategory,
    );
    const category = await this.parenCategoryRepository.find({
      where: {
        wallet: {
          id: wallet[0].id,
        },
      },
    });

    return category;
  }

  async addCategory(request, body, numberOfCategory) {
    const { parentCategoryId, nameCategory } = body;
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
      (item) => item.numberWalletUser == numberOfCategory,
    );
    const parentCategory = await this.parenCategoryRepository.find({
      where: {
        wallet: {
          id: wallet[0].id,
        },
      },
    });
    const categoryId = parentCategory.filter(
      (item) => item.id === parentCategoryId,
    );
    if (categoryId.length > 1 || categoryId.length == 0) {
      throw new BadRequestException('Error!!');
    }

    const category = {
      categoryName: nameCategory,
      parentCategory: parentCategoryId,
      wallet: wallet[0].id,
    };
    this.categoryRepository.save(category);

    return {
      ok: 'The category has been added',
    };
  }

  async getCategory(request, numberOfCategory) {
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
      (item) => item.numberWalletUser == numberOfCategory,
    );
    const categories = await this.categoryRepository.find({
      where: {
        wallet: {
          id: wallet[0].id,
        },
      },
      relations: ['parentCategory'],
    });
    const categoryResult = [];
    for (const item of categories) {
      categoryResult.push({
        id: item.id,
        name: item.categoryName,
        plannedBudget: item.plannedBudget,
        plannedBudgetValur: item.plannedBudgetValur,
        parentCategory: item.parentCategory.id,
      });
    }
    return categoryResult;
  }
}
