import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Controller('bank-account')
export class BankAccountController {
    constructor(private readonly bankAccountService: BankAccountService) {}
    @Get('search')
    async searchAccount(@Query() query: { bankName?: string; accountNo?: string }) {
        return this.bankAccountService.search(query);
    }

    @Post('create')
    async create(@Body() createBankAccountDto: CreateBankAccountDto) {
        return this.bankAccountService.createBankData(createBankAccountDto);
    }

    @Put('/:id')
    async fundBalance(@Param('id') id: string, @Body() updateBantAccountDto: UpdateBankAccountDto) {
        return this.bankAccountService.updateBalance(id, updateBantAccountDto);
    }

    @Get('/:id')
    async getSingleUserId(@Param('id') id: string) {
        return this.bankAccountService.getUser(id);
    }

    // @Get()
    // async getUserAccount(@Query('userId') userId: string) {
    //     return this.bankAccountService.getUser(userId);
    // }
}
