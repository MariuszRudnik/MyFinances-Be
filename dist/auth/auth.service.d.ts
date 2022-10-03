import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    login(body: any, response: any): Promise<UserEntity>;
    register(body: any): Promise<{
        first_name: any;
        last_name: any;
        email: any;
        password: string;
    } & UserEntity>;
    userData(request: any): Promise<UserEntity>;
    logout(response: any): Promise<{
        message: string;
    }>;
}
