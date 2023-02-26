import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtService } from '@nestjs/jwt';
import { WalletEntity } from '../wallet/entities/wallet.entity';
import { Repository } from 'typeorm';
export declare class TransactionsService {
    private readonly walletRepository;
    private readonly categoryRepository;
    private readonly parenCategoryRepository;
    private readonly transaction;
    private jwtService;
    constructor(walletRepository: Repository<WalletEntity>, categoryRepository: Repository<any>, parenCategoryRepository: Repository<any>, transaction: Repository<any>, jwtService: JwtService);
    wallet(createTransactionDto: CreateTransactionDto, numberOfWallet: any, request: any): Promise<WalletEntity[]>;
    create(createTransactionDto: CreateTransactionDto, numberOfWallet: any, request: any): Promise<{
        nameOfTransactions: string;
        price: number;
        dateExpenses: Date;
        operations: number;
        description: string;
        wallet: string;
        parentCategory: string;
        category: string;
        tags: string;
    }>;
    findTransactionWallet(createTransactionDto: any, numberOfWallet: any, request: any): Promise<any[]>;
    findPaginateTransactionWallet(createTransactionDto: any, numberOfWallet: any, request: any, currentPage?: number): Promise<{
        transactionItems: any[];
        pagesCount: number;
    }>;
    findTransactionInAMonth(createTransactionDto: any, numberOfWallet: any, request: any, month: any, year: any): Promise<any[]>;
    findSumOfTheMonth(createTransactionDto: any, numberOfWallet: any, request: any, month: any, year: any): Promise<{
        data: {
            type: string;
            sum: number;
        }[];
        theOldestDate: Date;
        theNewDate: Date;
    }>;
    findOne(id: number): string;
    update(id: any, request: any, numberOfWallet: any, transactionDto: any): Promise<any[]>;
    remove(id: string, request: any, numberOfWallet: any): Promise<any>;
}
