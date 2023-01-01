import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletEntity } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { addWalletType } from '../../types/wallet/wallet';
export declare class WalletService {
    private readonly walletRepository;
    private readonly categoryRepository;
    private readonly parenCategoryRepository;
    private jwtService;
    constructor(walletRepository: Repository<WalletEntity>, categoryRepository: Repository<any>, parenCategoryRepository: Repository<any>, jwtService: JwtService);
    create(createWalletDto: CreateWalletDto, request: any): Promise<addWalletType>;
    findWallet(numberOfWallet: any, request: any): Promise<WalletEntity>;
    findAllWallet(request: any): Promise<any[]>;
    update(id: number, updateWalletDto: UpdateWalletDto): string;
    remove(id: number): string;
    addParentCategory(numberOfCategory: any, request: any, body: any): Promise<any>;
    getParentCategory(request: any, numberOfCategory: any): Promise<any[]>;
    addCategory(request: any, body: any, numberOfCategory: any): Promise<{
        ok: string;
    }>;
    getCategory(request: any, numberOfCategory: any): Promise<any[]>;
}
