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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../user/entity/user.entity");
const transaction_entity_1 = require("../../transactions/entities/transaction.entity");
let WalletEntity = class WalletEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Primary key as Wallet ID',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WalletEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Number of the user's  wallet",
        example: '1',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WalletEntity.prototype, "numberWalletUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the user's wallet",
        example: 'Wallet',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletEntity.prototype, "nameOfWallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Type of currency of user's wallet",
        example: 'PLN',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletEntity.prototype, "typeOfCurrency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Initial states of user's wallet",
        example: '0',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WalletEntity.prototype, "initialState", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.wallet),
    __metadata("design:type", user_entity_1.UserEntity)
], WalletEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.Transaction, (transaction) => transaction.id),
    __metadata("design:type", transaction_entity_1.Transaction)
], WalletEntity.prototype, "transaction", void 0);
WalletEntity = __decorate([
    (0, typeorm_1.Entity)('wallet')
], WalletEntity);
exports.WalletEntity = WalletEntity;
//# sourceMappingURL=wallet.entity.js.map