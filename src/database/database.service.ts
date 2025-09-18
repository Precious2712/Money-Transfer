import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  onApplicationBootstrap() {
    this.connection.on('connected', () => {
      this.logger.log('✅ MongoDB connected successfully');
    });

    this.connection.on('error', (err) => {
      this.logger.error(`❌ MongoDB connection error: ${err}`);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB disconnected');
    });
  }
}
