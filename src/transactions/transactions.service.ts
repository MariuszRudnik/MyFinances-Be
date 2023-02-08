import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from '../wallet/entities/wallet.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../wallet/entities/category.entity';
import { ParentCategoriesEntity } from '../wallet/entities/parentCategories.entity';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<any>,
    @InjectRepository(ParentCategoriesEntity)
    private readonly parenCategoryRepository: Repository<any>,
    @InjectRepository(Transaction)
    private readonly transaction: Repository<any>,
    private jwtService: JwtService,
  ) {}

  async wallet(
    createTransactionDto: CreateTransactionDto,
    numberOfWallet,
    request,
  ) {
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
      (item) => item.numberWalletUser == numberOfWallet,
    );
    return wallet;
  }

  async create(
    createTransactionDto: CreateTransactionDto,
    numberOfWallet,
    request,
  ) {
    const {
      name,
      price,
      data: dateExpenses,
      parentCategory,
      category,
      operations,
      description,
      tags,
    } = createTransactionDto;
    const wallet = await this.wallet(
      createTransactionDto,
      numberOfWallet,
      request,
    );
    if (wallet.length > 1 || wallet.length == 0) {
      throw new BadRequestException('Something bad happened');
    }
    const categories = await this.categoryRepository.find({
      where: {
        wallet: {
          id: wallet[0].id,
        },
      },
      relations: ['parentCategory'],
    });
    const checkCategory = categories
      .filter((item) => item.parentCategory.id == parentCategory)
      .filter((item) => item.id == category);

    if (checkCategory.length > 1 || checkCategory.length == 0) {
      throw new BadRequestException('Something bad happened in category');
    }

    const transaction = {
      nameOfTransactions: name,
      price,
      dateExpenses,
      operations,
      description,
      wallet: wallet[0].id,
      parentCategory,
      category,
      tags,
    };
    await this.transaction.save(transaction);
    return transaction;
  }

  async findTransactionWallet(createTransactionDto, numberOfWallet, request) {
    const wallet = await this.wallet(
      createTransactionDto,
      numberOfWallet,
      request,
    );
    const transactions = await this.transaction.find({
      where: {
        wallet: {
          id: wallet[0].id,
        },
      },
      order: {
        dateExpenses: 'DESC',
      },
      relations: ['parentCategory', 'category'],
    });
    const transactionItems = [];

    for (const item of transactions) {
      transactionItems.push({
        id: item.id,
        name: item.nameOfTransactions,
        price: item.price,
        date: item.dateExpenses,
        operations: item.operations,
        description: item.description,
        parentCategory: item.parentCategory.id,
        category: item.category.id,
      });
    }

    return transactionItems;
  }

  async findPaginateTransactionWallet(
    createTransactionDto,
    numberOfWallet,
    request,
    currentPage = 0,
  ) {
    const wallet = await this.wallet(
      createTransactionDto,
      numberOfWallet,
      request,
    );
    const maxPerPage = 5;
    const [items, count] = await this.transaction.findAndCount({
      where: {
        wallet: {
          id: wallet[0].id,
        },
      },
      order: {
        dateExpenses: 'DESC',
      },
      skip: maxPerPage * currentPage,
      take: maxPerPage,
      relations: ['parentCategory', 'category'],
    });
    const pagesCount = Math.ceil(count / maxPerPage);
    const transactionItems = [];
    for (const item of items) {
      transactionItems.push({
        id: item.id,
        name: item.nameOfTransactions,
        price: item.price,
        date: item.dateExpenses,
        operations: item.operations,
        description: item.description,
        parentCategory: item.parentCategory.id,
        category: item.category.id,
      });
    }
    return { transactionItems, pagesCount };
  }

  async findTransactionInAMonth(
    createTransactionDto,
    numberOfWallet,
    request,
    month,
    year,
  ) {
    const wallet = await this.wallet(
      createTransactionDto,
      numberOfWallet,
      request,
    );
    const transaction = await this.transaction.find({
      where: {
        wallet: {
          id: wallet[0].id,
        },
      },
      order: {
        dateExpenses: 'DESC',
      },
      relations: ['parentCategory', 'category'],
    });
    console.log(year, month);
    const userData = new Date(`${year}-${month}`);

    const transactionYear = transaction
      .filter((item) => {
        const data = new Date(item.dateExpenses);
        return userData.getFullYear() == data.getFullYear();
      })
      .filter((item) => {
        const data = new Date(item.dateExpenses);
        return userData.getUTCMonth() == data.getUTCMonth();
      });
    const transactionItems = [];
    for (const item of transactionYear) {
      transactionItems.push({
        id: item.id,
        name: item.nameOfTransactions,
        price: item.price,
        date: item.dateExpenses,
        operations: item.operations,
        description: item.description,
        parentCategory: item.parentCategory.id,
        category: item.category.id,
      });
    }
    return transactionItems;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
