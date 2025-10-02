import { Module } from '@nestjs/common';
import { BankAccountController } from './bank-account.controller';
import { BankAccountService } from './bank-account.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BankAccount, BankAccountSchema } from './BankSchema/bank-account.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule,

    MongooseModule.forFeature([
      {
        name: BankAccount.name,
        schema: BankAccountSchema,
      }
    ]),
    AuthModule
  ],
  controllers: [BankAccountController],
  providers: [BankAccountService],
  exports: [MongooseModule]
})

export class BankAccountModule {}