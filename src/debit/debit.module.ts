import { Module } from '@nestjs/common';
import { DebitController } from './debit.controller';
import { DebitService } from './debit.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DebitSchema, DebitAlert } from './schema/debit-schema';
import { BankAccountModule } from 'src/bank-account/bank-account.module';

@Module({
  imports: [
    ConfigModule,

    MongooseModule.forFeature([
      {
        name: DebitAlert.name,
        schema: DebitSchema
      }
    ]),

    BankAccountModule
  ],

  controllers: [DebitController],
  providers: [DebitService]
})


export class DebitModule {}