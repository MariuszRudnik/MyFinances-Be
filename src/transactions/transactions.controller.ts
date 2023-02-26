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

  @Get('get-in-a-month/:numberOfWallet/:month/:year')
  findTransactionInAMonth(
    @Body() createTransactionDto: CreateTransactionDto,
    @Param('numberOfWallet') numberOfWallet: number,
    @Param('month') month: number,
    @Param('year') year: number,
    @Req() request: Request,
  ) {
    return this.transactionsService.findTransactionInAMonth(
      createTransactionDto,
      numberOfWallet,
      request,
      month,
      year,
    );
  }
  @Get('get-sum/:numberOfWallet/:month/:year')
  findSumOfTheAMonth(
    @Body() createTransactionDto: CreateTransactionDto,
    @Param('numberOfWallet') numberOfWallet: number,
    @Param('month') month: number,
    @Param('year') year: number,
    @Req() request: Request,
  ) {
    return this.transactionsService.findSumOfTheMonth(
      createTransactionDto,
      numberOfWallet,
      request,
      month,
      year,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':numberOfWallet/:id')
  update(
    @Body() transactionDto: CreateTransactionDto,
    @Param('id') id: string,
    @Req() request: Request,
    @Param('numberOfWallet') numberOfWallet: number,
  ) {
    return this.transactionsService.update(
      id,
      request,
      numberOfWallet,
      transactionDto,
    );
  }

  @Delete(':numberOfWallet/:id')
  remove(
    @Param('id') id: string,
    @Req() request: Request,
    @Param('numberOfWallet') numberOfWallet: number,
  ) {
    return this.transactionsService.remove(id, request, numberOfWallet);
  }
}
