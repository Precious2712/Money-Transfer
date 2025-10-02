import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post
} from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit-dto';

@Controller('credit')
export class CreditController {
    constructor(private readonly creditService: CreditService) {}

    @Post('create')
    async createCreditData(@Body() createCreditDto: CreateCreditDto) {
        return this.creditService.creditUser(createCreditDto);
    }

    @Get('/:id')
    async getAllCredit(@Param('id') id: string) {
        return this.creditService.userCreditsTransactions(id);
    }

    @Delete('/:id')
    async delDoc(@Param('id') id: string) {
        return this.creditService.deletedCreditRef(id);
    }
}
