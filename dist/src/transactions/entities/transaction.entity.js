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
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const wallet_entity_1 = require("../../wallet/entities/wallet.entity");
const parentCategories_entity_1 = require("../../wallet/entities/parentCategories.entity");
const category_entity_1 = require("../../wallet/entities/category.entity");
let Transaction = class Transaction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "nameOfTransactions", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Date)
], Transaction.prototype, "dateExpenses", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "operations", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wallet_entity_1.WalletEntity, (wallet) => wallet.transaction),
    __metadata("design:type", wallet_entity_1.WalletEntity)
], Transaction.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parentCategories_entity_1.ParentCategoriesEntity, (parentCategory) => parentCategory.transaction),
    __metadata("design:type", parentCategories_entity_1.ParentCategoriesEntity)
], Transaction.prototype, "parentCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, (category) => category.transaction),
    __metadata("design:type", category_entity_1.CategoryEntity)
], Transaction.prototype, "category", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)('transactions')
], Transaction);
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.entity.js.map