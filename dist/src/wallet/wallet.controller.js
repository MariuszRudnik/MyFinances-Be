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
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const create_wallet_dto_1 = require("./dto/create-wallet.dto");
const update_wallet_dto_1 = require("./dto/update-wallet.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/guards/auth.guard");
const wallet_entity_1 = require("./entities/wallet.entity");
const add_parent_category_dto_1 = require("./dto/add-parent-category.dto");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    addParentCategory(numberOfCategory, request, body) {
        return this.walletService.addParentCategory(numberOfCategory, request, body);
    }
    getParentCategory(request, numberOfCategory) {
        return this.walletService.getParentCategory(request, numberOfCategory);
    }
    addCategory(request, body, numberOfCategory) {
        return this.walletService.addCategory(request, body, numberOfCategory);
    }
    getCategory(request, numberOfCategory) {
        return this.walletService.getCategory(request, numberOfCategory);
    }
    create(createWalletDto, request) {
        return this.walletService.create(createWalletDto, request);
    }
    findAllWallet(request) {
        return this.walletService.findAllWallet(request);
    }
    findWallet(numberOfWallet, request) {
        return this.walletService.findWallet(numberOfWallet, request);
    }
    update(id, updateWalletDto) {
        return this.walletService.update(+id, updateWalletDto);
    }
    remove(id) {
        return this.walletService.remove(+id);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)('addParentCategory/:numberOfCategory'),
    __param(0, (0, common_1.Param)('numberOfCategory')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, add_parent_category_dto_1.AddParentCategoryDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "addParentCategory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)('addParentCategory/:numberOfCategory'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('numberOfCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getParentCategory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)('addCategory/:numberOfCategory'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('numberOfCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_parent_category_dto_1.AddParentCategoryDto, String]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "addCategory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)('addCategory/:numberOfCategory'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('numberOfCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getCategory", null);
__decorate([
    (0, swagger_1.ApiBody)({
        description: 'This Api link created new wallet',
        type: create_wallet_dto_1.CreateWalletDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User can add new wallet',
        type: wallet_entity_1.WalletEntity,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'You dont have entitlements to add new wallet',
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wallet_dto_1.CreateWalletDto, Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "findAllWallet", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)(':numberWallet'),
    __param(0, (0, common_1.Param)('numberWallet')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "findWallet", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_wallet_dto_1.UpdateWalletDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "remove", null);
WalletController = __decorate([
    (0, swagger_1.ApiTags)('Wallet'),
    (0, common_1.Controller)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map