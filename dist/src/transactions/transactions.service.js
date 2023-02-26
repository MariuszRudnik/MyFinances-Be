"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_entity_1 = require("../wallet/entities/wallet.entity");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../wallet/entities/category.entity");
const parentCategories_entity_1 = require("../wallet/entities/parentCategories.entity");
const transaction_entity_1 = require("./entities/transaction.entity");
let TransactionsService = class TransactionsService {
    constructor(walletRepository, categoryRepository, parenCategoryRepository, transaction, jwtService) {
        this.walletRepository = walletRepository;
        this.categoryRepository = categoryRepository;
        this.parenCategoryRepository = parenCategoryRepository;
        this.transaction = transaction;
        this.jwtService = jwtService;
    }
    async wallet(createTransactionDto, numberOfWallet, request) {
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
        const wallet = listOfWallet.filter((item) => item.numberWalletUser == numberOfWallet);
        return wallet;
    }
    async create(createTransactionDto, numberOfWallet, request) {
        const { name, price, data, parentCategory, category, operations, description, tags, } = createTransactionDto;
        const wallet = await this.wallet(createTransactionDto, numberOfWallet, request);
        if (wallet.length > 1 || wallet.length == 0) {
            throw new common_1.BadRequestException('Something bad happened');
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
            throw new common_1.BadRequestException('Something bad happened in category');
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
        const wallet = await this.wallet(createTransactionDto, numberOfWallet, request);
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
    async findPaginateTransactionWallet(createTransactionDto, numberOfWallet, request, currentPage = 0) {
        const wallet = await this.wallet(createTransactionDto, numberOfWallet, request);
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
    async findTransactionInAMonth(createTransactionDto, numberOfWallet, request, month, year) {
        const wallet = await this.wallet(createTransactionDto, numberOfWallet, request);
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
    async findSumOfTheMonth(createTransactionDto, numberOfWallet, request, month, year) {
        const wallet = await this.wallet(createTransactionDto, numberOfWallet, request);
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
            theOldestDate = transactionYearAndMonth.sort((a, b) => {
                return a.dateExpenses - b.dateExpenses;
            })[0];
            theNewDate = transactionYearAndMonth.sort((a, b) => {
                return b.dateExpenses - a.dateExpenses;
            })[0];
        }
        const influenceArray = [0];
        const expenditureArray = [0];
        transactionYearAndMonth
            .filter((item) => item.operations == 'influence')
            .forEach((item) => {
            influenceArray.push(item.price);
        });
        transactionYearAndMonth
            .filter((item) => item.operations == 'expenditure')
            .forEach((item) => {
            expenditureArray.push(item.price);
        });
        console.log(transactionYearAndMonth);
        const influence = influenceArray.reduce((prev, next) => Number(prev) + Number(next));
        const expenditure = expenditureArray.reduce((prev, next) => Number(prev) + Number(next));
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
    findOne(id) {
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
            throw new common_1.NotFoundException(`Transaction with id ${id} not found`);
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
    async remove(id, request, numberOfWallet) {
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
        const wallet = listOfWallet.find((item) => item.numberWalletUser == numberOfWallet);
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
};
TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallet_entity_1.WalletEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(parentCategories_entity_1.ParentCategoriesEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map