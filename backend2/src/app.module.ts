import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';import { ProductModule } from './product/product.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/product_db'),
    ProductModule,
  ],
})
export class AppModule {}