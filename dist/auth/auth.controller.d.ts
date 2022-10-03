import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        first_name: any;
        last_name: any;
        email: any;
        password: string;
    } & import("../user/entity/user.entity").UserEntity>;
    login(body: LoginDto, response: Response): Promise<import("../user/entity/user.entity").UserEntity>;
    user(request: Request): Promise<import("../user/entity/user.entity").UserEntity>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
