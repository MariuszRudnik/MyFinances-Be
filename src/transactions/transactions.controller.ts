import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Request } from 'express';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('add/:numberOfWallet')
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Param('numberOfWallet') numberOfWallet: number,
    @Req() request: Request,
  ) {
    return this.transactionsService.create(
      createTransactionDto,
      numberOfWallet,
      request,
    );
  }

  @Get(':numberOfWallet')
  findTransactionWallet(
    @Body() createTransactionDto: CreateTransactionDto,
    @Param('numberOfWallet') numberOfWallet: number,
    @Req() request: Request,
  ) {
    return this.transactionsService.findTransactionWallet(
      createTransactionDto,
      numberOfWallet,
      request,
    );
  }
  @Get(':numberOfWallet/:currentPage')
  findPaginateTransactionWallet(
    @Body() createTransactionDto: CreateTransactionDto,
    @Param('numberOfWallet') numberOfWallet: number,
    @Param('currentPage') currentPage: number,
    @Req() request: Request,
  ) {
    return this.transactionsService.findPaginateTransactionWallet(
      createTransactionDto,
      numberOfWallet,
      request,
      currentPage,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
