import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    all(): Promise<UserEntity[]>;
    update(id: number, body: UserUpdateDto): Promise<UserEntity>;
    delete(id: number): Promise<any>;
}
