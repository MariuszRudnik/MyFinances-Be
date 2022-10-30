import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response, Request } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '../user/entity/user.entity';
import { UserUpdateDto } from '../user/dto/user-update.dto';
@ApiTags('Authentication user')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBody({
    description: 'This Api link created users',
    type: RegisterDto,
  })
  @ApiCreatedResponse({
    description: 'Created user object as register.',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register. Ty again!',
  })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @ApiCreatedResponse({
    description: 'User login',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'User cannot login. Ty again!',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(body, response);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user')
  async user(@Req() request: Request) {
    return this.authService.userData(request);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
