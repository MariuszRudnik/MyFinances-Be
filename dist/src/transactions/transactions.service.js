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
        const { name, price, data: dateExpenses, parentCategory, category, operations, description, tags, } = createTransactionDto;
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
    findOne(id) {
        return `This action returns a #${id} transaction`;
    }
    update(id, updateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }
    remove(id) {
        return `This action removes a #${id} transaction`;
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