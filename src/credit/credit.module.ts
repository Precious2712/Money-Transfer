import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';
import { ConfigModule } from '@nestjs/config';
import { CreditAlert, creditSchema } from './schema/credit-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BankAccountModule } from 'src/bank-account/bank-account.module';

@Module({
  imports: [
    ConfigModule,

    MongooseModule.forFeature([
      {
        name: CreditAlert.name,
        schema: creditSchema
      }
    ]),

    BankAccountModule
  ],

  controllers: [CreditController],
  providers: [CreditService]
})

export class CreditModule {}