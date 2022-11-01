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
let WalletService = class WalletService {
    constructor(walletRepository, jwtService) {
        this.walletRepository = walletRepository;
        this.jwtService = jwtService;
    }
    async create(createWalletDto, request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        const { nameOfWallet, typeOfCurrency, initialState } = createWalletDto;
        const initialStateNumber = Number(initialState);
        const log = await this.walletRepository.find({
            select: {
                id: data.id,
            },
        });
        const wallet = {
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
    findOne(id) {
        return `This action returns a #${id} wallet`;
    }
    update(id, updateWalletDto) {
        return `This action updates a #${id} wallet`;
    }
    remove(id) {
        return `This action removes a #${id} wallet`;
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallet_entity_1.WalletEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map