import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../user/entity/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        firstName: any;
        lastName: any;
        email: any;
        password: string;
    } & UserEntity>;
    login(body: LoginDto, response: Response): Promise<UserEntity>;
    user(request: Request): Promise<UserEntity>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
