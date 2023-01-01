import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Request } from 'express';
import { WalletEntity } from './entities/wallet.entity';
import { AddParentCategoryDto } from './dto/add-parent-category.dto';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    addParentCategory(numberOfCategory: string, request: Request, body: AddParentCategoryDto): Promise<any>;
    getParentCategory(request: Request, numberOfCategory: string): Promise<any[]>;
    addCategory(request: Request, body: AddParentCategoryDto, numberOfCategory: string): Promise<{
        ok: string;
    }>;
    getCategory(request: Request, numberOfCategory: string): Promise<any[]>;
    create(createWalletDto: CreateWalletDto, request: Request): Promise<import("../../types").addWalletType>;
    findAllWallet(request: Request): Promise<any[]>;
    findWallet(numberOfWallet: string, request: Request): Promise<WalletEntity>;
    update(id: string, updateWalletDto: UpdateWalletDto): string;
    remove(id: string): string;
}
