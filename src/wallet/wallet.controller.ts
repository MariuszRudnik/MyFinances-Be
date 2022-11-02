import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/auth.guard';
import { WalletEntity } from './entities/wallet.entity';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiBody({
    description: 'This Api link created new wallet',
    type: CreateWalletDto,
  })
  @ApiCreatedResponse({
    description: 'User can add new wallet',
    type: WalletEntity,
  })
  @ApiBadRequestResponse({
    description: 'You dont have entitlements to add new wallet',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createWalletDto: CreateWalletDto, @Req() request: Request) {
    return this.walletService.create(createWalletDto, request);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
