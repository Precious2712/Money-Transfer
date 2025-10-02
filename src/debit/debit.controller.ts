import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post

} from '@nestjs/common';
import { DebitService } from './debit.service';
import { CreateDebitDto } from './dto/create-debit-dto';

@Controller('debit')
export class DebitController {
    constructor(private readonly debitService: DebitService) {}

    @Post('create')
    async createDebitTransaction(@Body() createDebitDto: CreateDebitDto) {
        return this.debitService.createDebitAlert(createDebitDto);
    }

    @Get('/:id')
    async getAllDebit(@Param('id') id: string) {
        return this.debitService.userDebitsTransactions(id);
    }

    @Delete('/:id')
    async delDocs(@Param('id') id: string) {
        return this.debitService.deletedDebitRef(id);
    }
}
