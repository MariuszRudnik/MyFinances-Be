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
exports.CategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const parentCategories_entity_1 = require("./parentCategories.entity");
const wallet_entity_1 = require("./wallet.entity");
const transaction_entity_1 = require("../../transactions/entities/transaction.entity");
let CategoryEntity = class CategoryEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CategoryEntity.prototype, "categoryName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "plannedBudget", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "plannedBudgetValur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parentCategories_entity_1.ParentCategoriesEntity, (parentCategory) => parentCategory.category),
    __metadata("design:type", parentCategories_entity_1.ParentCategoriesEntity)
], CategoryEntity.prototype, "parentCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wallet_entity_1.WalletEntity, (wallet) => wallet.category),
    __metadata("design:type", wallet_entity_1.WalletEntity)
], CategoryEntity.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.Transaction, (transaction) => transaction.category),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "transaction", void 0);
CategoryEntity = __decorate([
    (0, typeorm_1.Entity)('category')
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;
//# sourceMappingURL=category.entity.js.map