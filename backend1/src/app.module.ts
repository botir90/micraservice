import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
MongooseModule.forRoot('mongodb://nestuser:nest123@127.0.0.1:27017/auth_db?authSource=admin&authMechanism=SCRAM-SHA-1'),
    AuthModule,
  ],
})
export class AppModule {}