"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const transactions_controller_1 = require("./transactions.controller");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../utils/config");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_entity_1 = require("../wallet/entities/wallet.entity");
const parentCategories_entity_1 = require("../wallet/entities/parentCategories.entity");
const category_entity_1 = require("../wallet/entities/category.entity");
const transaction_entity_1 = require("./entities/transaction.entity");
let TransactionsModule = class TransactionsModule {
};
TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: config_1.JWT_SECRET,
                signOptions: { expiresIn: '1d' },
            }),
            typeorm_1.TypeOrmModule.forFeature([
                wallet_entity_1.WalletEntity,
                parentCategories_entity_1.ParentCategoriesEntity,
                category_entity_1.CategoryEntity,
                transaction_entity_1.Transaction,
            ]),
        ],
        controllers: [transactions_controller_1.TransactionsController],
        providers: [transactions_service_1.TransactionsService],
    })
], TransactionsModule);
exports.TransactionsModule = TransactionsModule;
//# sourceMappingURL=transactions.module.js.map