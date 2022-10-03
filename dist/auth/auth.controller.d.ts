import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    private userService;
    private jwtService;
    constructor(authService: AuthService, userService: UserService, jwtService: JwtService);
    register(body: RegisterDto): Promise<import("../user/entity/user.entity").UserEntity>;
    login(email: string, password: string, response: Response): Promise<import("../user/entity/user.entity").UserEntity>;
    user(request: Request): Promise<import("../user/entity/user.entity").UserEntity>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
