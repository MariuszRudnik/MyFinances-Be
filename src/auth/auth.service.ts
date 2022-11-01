import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async login(body, response) {
    const { email, password } = body;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, {
      httpOnly: true,
    });
    return user;
  }

  async register(body) {
    const userByEmail = await this.userRepository.findOneBy({
      email: body.email,
    });

    if (userByEmail) {
      throw new HttpException(
        'Email are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (body.password !== body.passwordConfirm) {
      throw new BadRequestException('Password do not match!');
    }
    const hashed = await bcrypt.hash(body.password, 12);

    return this.userRepository.save({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashed,
      //TODO: delete password when I are finish !!
    });
  }

  async userData(request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    return await this.userRepository.findOneBy({ id: data.id });
  }

  async logout(response) {
    response.clearCookie('jwt');
    return {
      message: 'Success',
    };
  }
}
