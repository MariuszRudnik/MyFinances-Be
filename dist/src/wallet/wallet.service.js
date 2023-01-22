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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_entity_1 = require("./entities/wallet.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const category_entity_1 = require("./entities/category.entity");
const parentCategories_entity_1 = require("./entities/parentCategories.entity");
let WalletService = class WalletService {
    constructor(walletRepository, categoryRepository, parenCategoryRepository, jwtService) {
        this.walletRepository = walletRepository;
        this.categoryRepository = categoryRepository;
        this.parenCategoryRepository = parenCategoryRepository;
        this.jwtService = jwtService;
    }
    async create(createWalletDto, request) {
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
            const checkOfNumberIfItExists = listOfWallet.find((cur) => cur.numberWalletUser === i);
            if (!checkOfNumberIfItExists) {
                numberWalletUser = i;
                break;
            }
        }
        const wallet = {
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
        const wallet = await listOfWallet.find((cut) => cut.numberWalletUser === number);
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
    update(id, updateWalletDto) {
        return `This action updates a #${id} wallet`;
    }
    remove(id) {
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
        const wallet = listOfWallet.filter((item) => item.numberWalletUser == numberOfCategory);
        if (wallet.length > 1 || wallet.length == 0) {
            throw new common_1.BadRequestException('Something bad happened');
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
        const wallet = listOfWallet.filter((item) => item.numberWalletUser == numberOfCategory);
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
        const wallet = listOfWallet.filter((item) => item.numberWalletUser == numberOfCategory);
        const parentCategory = await this.parenCategoryRepository.find({
            where: {
                wallet: {
                    id: wallet[0].id,
                },
            },
        });
        const categoryId = parentCategory.filter((item) => item.id === parentCategoryId);
        if (categoryId.length > 1 || categoryId.length == 0) {
            throw new common_1.BadRequestException('Error!!');
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
        const wallet = listOfWallet.filter((item) => item.numberWalletUser == numberOfCategory);
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
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallet_entity_1.WalletEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(parentCategories_entity_1.ParentCategoriesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map