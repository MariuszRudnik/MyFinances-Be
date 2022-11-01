import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    all(): Promise<UserEntity[]>;
    create(data: any): Promise<UserEntity>;
    findOne(condition: any): Promise<UserEntity>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
}
