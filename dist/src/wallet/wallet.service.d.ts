import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletEntity } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { addWalletType } from '../../types/wallet/wallet';
export declare class WalletService {
    private readonly walletRepository;
    private jwtService;
    constructor(walletRepository: Repository<WalletEntity>, jwtService: JwtService);
    create(createWalletDto: CreateWalletDto, request: any): Promise<addWalletType>;
    findAll(): Promise<WalletEntity[]>;
    findOne(id: number): string;
    update(id: number, updateWalletDto: UpdateWalletDto): string;
    remove(id: number): string;
}
