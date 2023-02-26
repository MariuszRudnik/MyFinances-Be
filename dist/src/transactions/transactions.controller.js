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
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/guards/auth.guard");
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    create(createTransactionDto, numberOfWallet, request) {
        return this.transactionsService.create(createTransactionDto, numberOfWallet, request);
    }
    findTransactionWallet(createTransactionDto, numberOfWallet, request) {
        return this.transactionsService.findTransactionWallet(createTransactionDto, numberOfWallet, request);
    }
    findPaginateTransactionWallet(createTransactionDto, numberOfWallet, currentPage, request) {
        return this.transactionsService.findPaginateTransactionWallet(createTransactionDto, numberOfWallet, request, currentPage);
    }
    findTransactionInAMonth(createTransactionDto, numberOfWallet, month, year, request) {
        return this.transactionsService.findTransactionInAMonth(createTransactionDto, numberOfWallet, request, month, year);
    }
    findSumOfTheAMonth(createTransactionDto, numberOfWallet, month, year, request) {
        return this.transactionsService.findSumOfTheMonth(createTransactionDto, numberOfWallet, request, month, year);
    }
    findOne(id) {
        return this.transactionsService.findOne(+id);
    }
    update(transactionDto, id, request, numberOfWallet) {
        return this.transactionsService.update(id, request, numberOfWallet, transactionDto);
    }
    remove(id, request, numberOfWallet) {
        return this.transactionsService.remove(id, request, numberOfWallet);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)('add/:numberOfWallet'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('numberOfWallet')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, Number, Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':numberOfWallet'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('numberOfWallet')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, Number, Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findTransactionWallet", null);
__decorate([
    (0, common_1.Get)(':numberOfWallet/:currentPage'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('numberOfWallet')),
    __param(2, (0, common_1.Param)('currentPage')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, Number, Number, Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findPaginateTransactionWallet", null);
__decorate([
    (0, common_1.Get)('get-in-a-month/:numberOfWallet/:month/:year'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('numberOfWallet')),
    __param(2, (0, common_1.Param)('month')),
    __param(3, (0, common_1.Param)('year')),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, Number, Number, Number, Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findTransactionInAMonth", null);
__decorate([
    (0, common_1.Get)('get-sum/:numberOfWallet/:month/:year'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('numberOfWallet')),
    __param(2, (0, common_1.Param)('month')),
    __param(3, (0, common_1.Param)('year')),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, Number, Number, Number, Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findSumOfTheAMonth", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':numberOfWallet/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Param)('numberOfWallet')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, String, Object, Number]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':numberOfWallet/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('numberOfWallet')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "remove", null);
TransactionsController = __decorate([
    (0, swagger_1.ApiTags)('Transactions'),
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transactions.controller.js.map