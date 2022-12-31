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
exports.ParentCategoriesEntity = void 0;
const typeorm_1 = require("typeorm");
const wallet_entity_1 = require("./wallet.entity");
const category_entity_1 = require("./category.entity");
let ParentCategoriesEntity = class ParentCategoriesEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ParentCategoriesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ParentCategoriesEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wallet_entity_1.WalletEntity, (wallet) => wallet.parentCategory),
    __metadata("design:type", wallet_entity_1.WalletEntity)
], ParentCategoriesEntity.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.CategoryEntity, (category) => category.parentCategory),
    __metadata("design:type", Array)
], ParentCategoriesEntity.prototype, "category", void 0);
ParentCategoriesEntity = __decorate([
    (0, typeorm_1.Entity)()
], ParentCategoriesEntity);
exports.ParentCategoriesEntity = ParentCategoriesEntity;
//# sourceMappingURL=parentCategories.entity.js.map