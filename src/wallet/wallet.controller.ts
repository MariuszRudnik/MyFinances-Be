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
import { AddParentCategoryDto } from './dto/add-parent-category.dto';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('addParentCategory/:numberOfCategory')
  addParentCategory(
    @Param('numberOfCategory') numberOfCategory: string,
    @Req() request: Request,
    @Body() body: AddParentCategoryDto,
  ) {
    return this.walletService.addParentCategory(
      numberOfCategory,
      request,
      body,
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('addParentCategory/:numberOfCategory')
  getParentCategory(
    @Req() request: Request,
    @Param('numberOfCategory') numberOfCategory: string,
  ) {
    return this.walletService.getParentCategory(request, numberOfCategory);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('addCategory')
  addCategory(@Req() request: Request, @Body() body: AddParentCategoryDto) {
    return this.walletService.addCategory(request, body);
  }

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

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAllWallet(@Req() request: Request) {
    return this.walletService.findAllWallet(request);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':numberWallet')
  findWallet(
    @Param('numberWallet') numberOfWallet: string,
    @Req() request: Request,
  ) {
    return this.walletService.findWallet(numberOfWallet, request);
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
