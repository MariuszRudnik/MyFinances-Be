import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async all(): Promise<UserEntity[]> {
    return await this.userService.all();
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    await this.userService.update(id, body);
    return this.userService.findOne({ id });
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
