import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async all(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async create(data): Promise<UserEntity> {
    return await this.userRepository.save(data);
  }
  async findOne(condition): Promise<UserEntity> {
    return this.userRepository.findOneBy(condition);
  }
  async update(id: number, data): Promise<any> {
    return this.userRepository.update(id, data);
  }
  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
}
