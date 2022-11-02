import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Request } from 'express';
import { WalletEntity } from './entities/wallet.entity';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    create(createWalletDto: CreateWalletDto, request: Request): Promise<import("../../types").addWalletType>;
    findAll(): Promise<WalletEntity[]>;
    findOne(id: string): string;
    update(id: string, updateWalletDto: UpdateWalletDto): string;
    remove(id: string): string;
}
