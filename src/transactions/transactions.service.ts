import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      data,
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
    const date = data;

    const transaction = {
      nameOfTransactions: name,
      price,
      dateExpenses: date,
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

    const userData = new Date(`${year}-${month}`);

    const transactionYearAndMonth = transaction
      .filter((item) => {
        const data = new Date(item.dateExpenses);
        return userData.getFullYear() == data.getFullYear();
      })
      .filter((item) => {
        const data = new Date(item.dateExpenses);
        return userData.getUTCMonth() == data.getUTCMonth();
      });
    const transactionItems = [];
    for (const item of transactionYearAndMonth) {
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

  async findSumOfTheMonth(
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
    const userData = new Date(`${year}-${month}`);

    const transaction = await this.transaction.find({
      where: {
        wallet: {
          id: wallet[0].id,
        },
      },
      order: {
        dateExpenses: 'DESC',
      },
    });

    const transactionYearAndMonth = transaction
      .filter((item) => {
        const data = new Date(item.dateExpenses);
        return userData.getFullYear() == data.getFullYear();
      })
      .filter((item) => {
        const data = new Date(item.dateExpenses);
        return userData.getUTCMonth() == data.getUTCMonth();
      });
    const toDay = new Date();

    let theOldestDate = { dateExpenses: toDay };
    let theNewDate = { dateExpenses: toDay };

    if (transactionYearAndMonth.length >= 1) {
      theOldestDate = transactionYearAndMonth.sort((a: any, b: any) => {
        return a.dateExpenses - b.dateExpenses;
      })[0];
      theNewDate = transactionYearAndMonth.sort((a: any, b: any) => {
        return b.dateExpenses - a.dateExpenses;
      })[0];
    }

    const influenceArray: Array<number> = [0];
    const expenditureArray: Array<number> = [0];
    transactionYearAndMonth
      .filter((item: any) => item.operations == 'influence')
      .forEach((item: any) => {
        influenceArray.push(item.price);
      });
    transactionYearAndMonth
      .filter((item: any) => item.operations == 'expenditure')
      .forEach((item: any) => {
        expenditureArray.push(item.price);
      });
    console.log(transactionYearAndMonth);
    const influence = influenceArray.reduce(
      (prev, next) => Number(prev) + Number(next),
    );
    const expenditure = expenditureArray.reduce(
      (prev, next) => Number(prev) + Number(next),
    );
    const data = [
      { type: 'Influence', sum: influence },
      { type: 'Expenditure', sum: expenditure },
    ];

    return {
      data,
      theOldestDate: theOldestDate.dateExpenses,
      theNewDate: theNewDate.dateExpenses,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(id, request, numberOfWallet, transactionDto) {
    const wallet = await this.wallet(transactionDto, numberOfWallet, request);
    const transaction = await this.transaction.find({
      where: {
        id: id,
        wallet: {
          id: wallet[0].id,
        },
      },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    if (transaction.length > 1) {
      throw new Error('Something wrong');
    }

    const categories = await this.categoryRepository.find({
      where: {
        id: transactionDto.category,
        wallet: {
          id: wallet[0].id,
        },
        parentCategory: {
          id: transactionDto.parentCategory,
        },
      },
      relations: ['parentCategory'],
    });
    if (categories.length != 1) {
      throw new Error('Something bad happened in category');
    }
    transaction[0].nameOfTransactions = transactionDto.name;
    transaction[0].price = transactionDto.price;
    transaction[0].dateExpenses = transactionDto.date;
    transaction[0].description = transactionDto.description;
    transaction[0].operations = transactionDto.operations;
    transaction[0].description = transactionDto.description;
    transaction[0].category = transactionDto.category;
    transaction[0].parentCategory = transactionDto.parentCategory;

    const updatedTransaction = await this.transaction.save(transaction);
    return updatedTransaction;
  }

  async remove(id: string, request, numberOfWallet) {
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
    const wallet = listOfWallet.find(
      (item) => item.numberWalletUser == numberOfWallet,
    );
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    const transaction = await this.transaction.findOne({
      where: {
        id,
        wallet: {
          id: wallet.id,
        },
      },
    });
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    await this.transaction.remove(transaction);
    return transaction;
  }
}
