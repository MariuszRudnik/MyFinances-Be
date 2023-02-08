import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Request } from 'express';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto, numberOfWallet: number, request: Request): Promise<{
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
    findTransactionWallet(createTransactionDto: CreateTransactionDto, numberOfWallet: number, request: Request): Promise<any[]>;
    findPaginateTransactionWallet(createTransactionDto: CreateTransactionDto, numberOfWallet: number, currentPage: number, request: Request): Promise<{
        transactionItems: any[];
        pagesCount: number;
    }>;
    findTransactionInAMonth(createTransactionDto: CreateTransactionDto, numberOfWallet: number, month: number, year: number, request: Request): Promise<any[]>;
    findOne(id: string): string;
    update(id: string, updateTransactionDto: UpdateTransactionDto): string;
    remove(id: string): string;
}
