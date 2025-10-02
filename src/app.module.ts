import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { DebitModule } from './debit/debit.module';
import { CreditModule } from './credit/credit.module';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // MongoDB Connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        // console.log('🔗 Connecting to MongoDB with URI:', uri);
        return { uri };
      },
    }),

    HealthModule,
    DatabaseModule,
    AuthModule,
    BankAccountModule,
    DebitModule,
    CreditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}